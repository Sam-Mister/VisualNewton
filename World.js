/*
This class is the main bulk of the physics engine. Each instance of a world has
properties that are set on creation and can be toggled. The world can contain objects,
these are currently stored in an object(Hopefully change this to a QuadTree in the future).
*/
class World{
  constructor(properties = {timestep : 1, x_min : 0, x_max : 0, y_min : 0, y_max : 0,
    BoundaryConditions : "solid",
    TwoBodyForces : false,
    NewtonGravity : false,
    UniformGravity : false,
  }){
    /*How much the global time will be incremented each step*/
    this.timeStep = properties.timestep;
    this.currentTime = 0;
    /*this dictionary stores the objects in the world*/
    this.WorldObjects = {};
    /*Newtons Universal Gravitational Constant*/
    this.G = 1
    /*Specify the boundaries of the world*/
    this.x_min = properties.x_min
    this.x_max = properties.x_max
    this.y_min = properties.y_min
    this.y_max = properties.y_max
    /*What type of boundaries*/
    this.BoundaryConditions = properties.BoundaryConditions
    /*Boolean variables to set the forces in the world*/
    this.TwoBodyForces = properties.TwoBodyForces
    this.NewtonGravity = properties.NewtonGravity
    this.UniformGravity = properties.UniformGravity
  };
/*This method can be called to add an objects to the world*/
  addobject = function(object){
    this.WorldObjects[object.id] = object;
  };
  /*This method can be called to remove an object form the world. It has to be given an id
    to identify the object to be removed
  */
  removeobject = function(id){
    delete this.WorldObjects[id];
  };
  /*This function calculates the newtownian gravity force between two objects in the world*/
  NewtonGravityforce = function (id1,id2) {
    let force = Vector.unitVectorBetween(this.WorldObjects[id1].pos, this.WorldObjects[id2].pos)
    let separation = Vector.distanceSqua(this.WorldObjects[id1].pos, this.WorldObjects[id2].pos);
    let strength = 0
    if (separation <= this.WorldObjects[id1].radius + this.WorldObjects[id2].radius){
      strength = 0
    }else{
      strength = -1*(this.G*this.WorldObjects[id1].mass*this.WorldObjects[id2].mass)/(separation)
    }
    force.multiply(strength)
    return force
  }
/*This function calculates the force felt by the objects in a uniform gravitational field*/
  UniformGravityforce = function (id){
    let gunit = new Vector(0,1);
    let Gforce = Vector.multiply(gunit,0.5*this.WorldObjects[id].mass);
    return Gforce;
  }
/*
The object updater loops through all the objects and adds up the forces acting on them.
The position and velocity of the particles is updated using eulers method. Hopefully
this will be updated to a more accurate method like the modified euler method or a RK method.
*/
  ObjectUpdater = function(){
    for (var key in this.WorldObjects){
      let obj1 = this.WorldObjects[key]
      if (obj1 instanceof PointParticle){
      obj1.vel.multiply(this.timeStep)
      obj1.updatePos(obj1.vel)

      let CurrentTotalForce = new Vector(0,0);
      if (this.UniformGravity){
        CurrentTotalForce = Vector.add(CurrentTotalForce,this.UniformGravityforce(key));
      }
      if (this.TwoBodyForces){
        for (var key2 in this.WorldObjects){
          if (key === key2){ continue; }
            if(this.NewtonGravity){
              CurrentTotalForce = Vector.add(CurrentTotalForce,this.NewtonGravityforce(key,key2));
          }
        }
      }
        let InverseMass = 1/(obj1.mass)
        let CurrentAccel = Vector.multiply(CurrentTotalForce,InverseMass);
        let VelUpdater = Vector.multiply(CurrentAccel,this.timeStep);
        obj1.updateVel(VelUpdater)
      }
    }
  }
/*
Collision detection is in a very basic state currently. It only works for circle-circle collisions
Currently we loop over every object and check if they are overlapping. If they are then
calculate the direction and speed of the collision and update the velocities accordingly.

Ideally want to add a broad phase to this process so we dont have to check for collisions
between distant objects. Also, different type of collisions need to be handled. Probably
will be done by adding a object type check.
*/
  CollisionDetection = function(){
    for (var key in this.WorldObjects){
      let obj1 = this.WorldObjects[key];
      for (var key2 in this.WorldObjects){
        if (key === key2){ continue; }
        let obj2 = this.WorldObjects[key2];
        let sep = Math.sqrt(Vector.distanceSqua(obj1.pos,obj2.pos))
        if (sep <= obj1.radius + obj2.radius){
          let CollisionDirection = Vector.subtract(obj2.pos,obj1.pos)
          CollisionDirection.normalise();
          let CollisionVelocity = Vector.subtract(obj1.vel,obj2.vel);
          let speed = Vector.dot(CollisionVelocity,CollisionDirection);
          let e = Math.min(obj1.restitution, obj2.restitution)
          if (speed < 0){
            break;
          }
          let impulse = 2* speed / (obj1.mass + obj2.mass)
          let Obj1VelUpdater = Vector.multiply(CollisionDirection,(-1 * impulse * obj2.mass * e * this.timeStep));
          let Obj2VelUpdater = Vector.multiply(CollisionDirection,(impulse * obj1.mass * e * this.timeStep));
          obj1.updateVel(Obj1VelUpdater);
          obj2.updateVel(Obj2VelUpdater);
        }
      }
    }
  }

/* This whole section needs to be rewritten*/
  BoundaryCollision = function(){
    let obj;
     for (var key in this.WorldObjects)
     {
         obj = this.WorldObjects[key];
         if (this.BoundaryConditions === "solid"){
           // Check for left and right
           if (obj.pos.x < this.x_min + obj.radius){
               obj.pos.x = this.x_min + obj.radius;
               obj.vel.x = Math.abs(obj.vel.x) * obj.restitution * this.timeStep;
           }else if (obj.pos.x > this.x_max - obj.radius){
               obj.pos.x = this.x_max - obj.radius;
               obj.vel.x = -Math.abs(obj.vel.x) * obj.restitution * this.timeStep;
           }

           // Check for bottom and top
           if (obj.pos.y < this.y_min + obj.radius){
               obj.pos.y = this.y_min + obj.radius;
               obj.vel.y = Math.abs(obj.vel.y) * obj.restitution * this.timeStep;
           } else if (obj.pos.y >= this.y_max - obj.radius){
               obj.pos.y = this.y_max - obj.radius;
               obj.vel.y = -Math.abs(obj.vel.y) * obj.restitution * this.timeStep;
           }
       }else{
         if (obj.pos.x < this.x_min + obj.radius){
             obj.pos.x = this.x_max - obj.radius;
         }else if (obj.pos.x > this.x_max - obj.radius){
             obj.pos.x = this.x_min + obj.radius;
         }

         // Check for bottom and top
         if (obj.pos.y < this.y_min + obj.radius){
             obj.pos.y = this.y_max - obj.radius;
         } else if (obj.pos.y > this.y_max - obj.radius){
             obj.pos.y = this.y_min + obj.radius;
         }
       }
     }
  }
  updateWorld = function(){
    this.ObjectUpdater();
    this.BoundaryCollision();
    this.CollisionDetection();
    this.currentTime += this.timeStep
  };


}

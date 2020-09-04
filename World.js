class World{
  constructor(properties = {timestep : 1, x_min : 0, x_max : 0, y_min : 0, y_max : 0,
    BoundaryConditions : "solid",
    TwoBodyForces : false,
    NewtonGravity : false,
    UniformGravity : false,
  }){
    this.timeStep = properties.timestep;
    this.currentTime = 0;
    this.WorldObjects = {};
    this.G = 1
    this.x_min = properties.x_min
    this.x_max = properties.x_max
    this.y_min = properties.y_min
    this.y_max = properties.y_max
    this.BoundaryConditions = properties.BoundaryConditions
    this.TwoBodyForces = properties.TwoBodyForces
    this.NewtonGravity = properties.NewtonGravity
    this.UniformGravity = properties.UniformGravity
  };

  addobject = function(object){
    this.WorldObjects[object.id] = object;
  };
  removeobject = function(id){
    delete this.WorldObjects[id];
  };

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

  UniformGravityforce = function (id){
    let gunit = new Vector(0,1);
    let Gforce = Vector.multiply(gunit,0.5*this.WorldObjects[id].mass);
    return Gforce;
  }

  ObjectUpdater = function(){
    for (var key in this.WorldObjects){
      let obj1 = this.WorldObjects[key]
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
          let Obj1VelUpdater = Vector.multiply(CollisionDirection,(-1 * impulse * obj2.mass * e));
          let Obj2VelUpdater = Vector.multiply(CollisionDirection,(impulse * obj1.mass * e));
          obj1.updateVel(Obj1VelUpdater);
          obj2.updateVel(Obj2VelUpdater);
        }
      }
    }
  }

  BoundaryCollision = function(){
    let obj;
     for (var key in this.WorldObjects)
     {
         obj = this.WorldObjects[key];
         if (this.BoundaryConditions === "solid"){
           // Check for left and right
           if (obj.pos.x < this.x_min + obj.radius){
               obj.vel.x = Math.abs(obj.vel.x) * obj.restitution;
               obj.pos.x = this.x_min + obj.radius;
           }else if (obj.pos.x > this.x_max - obj.radius){
               obj.vel.x = -Math.abs(obj.vel.x) * obj.restitution;
               obj.pos.x = this.x_max - obj.radius;
           }

           // Check for bottom and top
           if (obj.pos.y < this.y_min + obj.radius){
               obj.vel.y = Math.abs(obj.vel.y) * obj.restitution;
               obj.pos.y = this.y_min + obj.radius;
           } else if (obj.pos.y > this.y_max - obj.radius){
               obj.vel.y = -Math.abs(obj.vel.y) * obj.restitution;
               obj.pos.y = this.y_max - obj.radius;
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
    this.BoundaryCollision();
    this.CollisionDetection();
    this.ObjectUpdater();
    this.currentTime += this.timeStep
  };


}

class World{
  constructor(timeStep,x_min,x_max,y_min,y_max){
    this.timeStep = timeStep;
    this.currentTime = 0;
    this.WorldObjects = {};
    this.running = false;
    this.G = 2
    this.x_min = x_min
    this.x_max = x_max
    this.y_min = y_min
    this.y_max = y_max
  };

  addobject = function(object){
    this.WorldObjects[object.id] = object;
  };
  removeobject = function(id){
    delete this.WorldObjects[id];
  };

  forceBetween = function (id1,id2) {
    let force = Vector.unitVectorBetween(this.WorldObjects[id1].pos, this.WorldObjects[id2].pos)
    let separation = Vector.distanceSqua(this.WorldObjects[id1].pos, this.WorldObjects[id2].pos);
    let strength = -1*(this.G*this.WorldObjects[id1].mass*this.WorldObjects[id2].mass)/(separation)
    force.multiply(strength)
    return force
  }

  ObjectUpdater = function(){
    for (var key in this.WorldObjects){
      let obj1 = this.WorldObjects[key]
      obj1.vel.multiply(this.timeStep)
      obj1.updatePos(obj1.vel)
      let CurrentTotalForce = new Vector(0,0);
      for (var key2 in this.WorldObjects){
        if (key === key2){ continue; }
        CurrentTotalForce = Vector.add(CurrentTotalForce,this.forceBetween(key,key2));
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
     }
  }
  updateWorld = function(){
    this.BoundaryCollision();
    this.CollisionDetection();
    this.ObjectUpdater();
    this.currentTime += this.timeStep
  };


}

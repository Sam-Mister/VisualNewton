class World{
  constructor(timeStep){
    this.timeStep = timeStep;
    this.currentTime = 0;
    this.WorldObjects = {};
    this.running = false;
    this.G = 1
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
let strength = (this.G*this.WorldObjects[id1].mass*this.WorldObjects[id2].mass)/(separation)
force.multiply(strength)
return force
}

  updateWorld = function(){
    for (var key in this.WorldObjects){
      let CurrentTotalForce = new Vector(0,0);
      for (var key2 in this.WorldObjects){
        if (key === key2){ continue; }
        CurrentTotalForce = Vector.add(CurrentTotalForce,this.forceBetween(key,key2));
        this.WorldObjects[key2].vel.multiply(this.timeStep)
        this.WorldObjects[key2].updatePos(this.WorldObjects[key2].vel)

        let InverseMass = 1/(this.WorldObjects[key2].mass)
        let CurrentAccel = Vector.multiply(CurrentTotalForce,InverseMass);
        let VelUpdater = Vector.multiply(CurrentAccel,this.timeStep);
        this.WorldObjects[key2].updateVel(VelUpdater)
      }
    }
    this.currentTime += this.timeStep
  };


}

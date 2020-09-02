class World{
  constructor(timeStep){
    this.timeStep = timeStep;
    this.currentTime = 0;
    this.WorldObjects = {};
    this.running = false;
  };

  addobject = function(object){
    this.WorldObjects[object.id] = object;
  };
  removeobject = function(id){
    delete this.WorldObjects[id];
  };

  updateWorld = function(){
    for (var key in this.WorldObjects){

    }
    this.currentTime += this.timeStep
  };

  RunWorld = function(){
    this.running = toggle(this.running);
    while (this.running === true) {
      this.updateWorld();
    }
  };
}

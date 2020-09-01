class World{
  constructor(timeStep){
    this.timeStep = timeStep;
    this.currentTime = 0;
    this.WorldObjects = [];
  };

  addobject = function(object){
    this.WorldObjects.push(object);
  };
  removeobject = function(index){
    this.WorldObjects.splice(index, 1);
  };

  updateWorld = function(){
    for (var object of this.WorldObjects){
      //will update objects in the world and incriment the time step
    }
  };
}

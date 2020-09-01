class World{
  constructor(){
    this.WorldObjects = [];
  };

  addobject = function(object){
    this.WorldObjects.push(object);
  };
  removeobject = function(index){
    this.WorldObjects.splice(index, 1);
  };

}

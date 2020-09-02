//This file contains useful functions to be used throughout the library
function toggle(item){																														//Toggles the truth value of a variable
	item === true ? item = false : item = true
	return item
}

class Vector{                                                                   //Creating a Vector Class to handle data
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  static add(Vec1,Vec2){
    if(Vec1 instanceof Vector && Vec2 instanceof Vector){
      let xComp = Vec1.x + Vec2.x;
      let yComp = Vec1.y + Vec2.y;
      let result = new Vector(xComp,yComp);
      return result
    }else{
      console.log("add takes 2 vector objects");
    }
  }

  static subtract(Vec1,Vec2){
    if(Vec1 instanceof Vector && Vec2 instanceof Vector){
      let xComp = Vec1.x - Vec2.x;
      let yComp = Vec1.y - Vec2.y;
      let result = new Vector(xComp,yComp);
      return result
    }else{
      console.log("add takes 2 vector objects");
    }
  }

  static lengthSquared(Vec){
    if(Vec instanceof Vector){
      let result = parseFloat(Vec.x**2 + Vec.y**2)
      return result
    }else{
        console.log("lengthSquared takes a vector object");
    }
  }

  multiply = function(num){
   this.x = num*this.x;
   this.y = num*this.y;
 }

  static multiply(Vec,num){
    let xComp = Vec.x * num;
    let yComp = Vec.y * num;
    let result = new Vector(xComp,yComp);
    return result
 }


  static unitVectorBetween(Vec1,Vec2){
    if(Vec1 instanceof Vector && Vec2 instanceof Vector){
      let difference = Vector.subtract(Vec1,Vec2);
      let normalise = 1/Math.sqrt(Vector.lengthSquared(difference));
      difference.multiply(normalise)
      return difference
    }else{
      console.log("unitVectorBetween takes 2 vector objects");
    }
  }

  static distanceSqua(Vec1,Vec2){
    if(Vec1 instanceof Vector && Vec2 instanceof Vector){
      let dist = parseFloat((Vec1.x-Vec2.x)**2 + (Vec1.y-Vec2.y)**2)
      return dist
    }else{
      console.log("distance takes 2 vector objects");
    }
  }


}

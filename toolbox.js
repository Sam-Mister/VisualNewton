//This file contains useful functions to be used throughout the library
/*Toggles the truth value of a variable*/
function toggle(item){
	item === true ? item = false : item = true
	return item
}

/*Creating a Vector Class to handle data*/
class Vector{                             
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
			difference.normalise();
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

	static dot(Vec1,Vec2){
		if(Vec1 instanceof Vector && Vec2 instanceof Vector){
      let dot = Vec1.x*Vec2.x + Vec1.y*Vec2.y
      return dot
    }else{
      console.log("dot takes 2 vector objects");
    }
	}

	normalise = function(){
		let length = Math.sqrt(this.x**2 + this.y**2);
		this.x = this.x * (1/length);
		this.y = this.y * (1/length);
	}


}

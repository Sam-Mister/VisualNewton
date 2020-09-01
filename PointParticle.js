class PointParticle{
  constructor(x,y,v_x,v_y,mass){
    this.pos = {x : x , y : y};
    this.vel = {v_x : v_x , v_y : v_y};
    this.mass = mass;
  }
updatePos = function(newX, newY){
  this.pos.x = newX;
  this.pos.y = newY;
}

updateVel = function(newVX, newVY){
  this.vel.v_x = newVX;
  this.vel.v_y = newVY;
}

}

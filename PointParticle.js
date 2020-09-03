class PointParticle{
  constructor(x,y,v_x,v_y,mass,id,radius,restitution){
    this.pos = new Vector(x,y);
    this.vel = new Vector(v_x,v_y);
    this.mass = mass;
    this.id = id;
    this.radius = radius;
    this.restitution = restitution;
  }
updatePos = function(newPos){
  this.pos = Vector.add(this.pos,newPos);
}

updateVel = function(newVel){
  this.vel = Vector.add(this.vel,newVel);
}

}

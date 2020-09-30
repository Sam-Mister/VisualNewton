class PointParticle extends StaticParticle{
  constructor(x,y,v_x,v_y,mass,id,radius,restitution){
    super(x,y,mass,id,radius,restitution);
    this.vel = new Vector(v_x,v_y);
    this.type = "PointParticle"
  }
updatePos = function(newPos){
  this.pos = Vector.add(this.pos,newPos);
}

updateVel = function(newVel){
  this.vel = Vector.add(this.vel,newVel);
}

}

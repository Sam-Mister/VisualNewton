class StaticParticle{
  constructor(x,y,mass,id,radius,restitution){
    this.pos = new Vector(x,y);
    this.mass = mass;
    this.id = id;
    this.radius = radius;
    this.restitution = restitution;
    this.type = "StaticParticle"
    this.inWorld = false
  }
}

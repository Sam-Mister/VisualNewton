let particleArr = [];
let clicker = 0

function setup() {
  createCanvas(800, 600);
  properties = {timestep : 1, x_min : -1*canvas.width/2, x_max : canvas.width/2, y_min : -1*canvas.height/2, y_max : canvas.height/2,
    BoundaryConditions : "solid",
    TwoBodyForces : true,
    NewtonGravity : true,
    UniformGravity : false,
  };

  world = new World(properties);

  p1_render = new Circle(0,-50,0,0,100,"Particle_1",0.4)
  world.addobject(p1_render.particle);
  p2_render = new Circle(0,50,-0.5,0,100,"Particle_2",0.4)
  world.addobject(p2_render.particle);
  p3_render = new Circle(50,0,0,0.5,100,"Particle_3",0.4)
  world.addobject(p3_render.particle);
  p4_render = new Circle(-50,0,0,-0.5,1000,"Particle_4",0.4)
  world.addobject(p4_render.particle);


}

function draw() {
  translate(canvas.width/2,canvas.height/2)
  background(50);
  p1_render.update();
  p2_render.update();
  p3_render.update();
  p4_render.update();

  for (var i = 0; i < particleArr.length; i++){
    particleArr[i].update();
  }
  world.updateWorld();

}

function mouseClicked(){
  let Pholder = new Circle((mouseX-canvas.width/2),(mouseY - canvas.height/2),0,0,200,"swarm"+clicker,0.9)
  particleArr.push(Pholder)
  world.addobject(Pholder.particle);
  clicker++
}

class Circle{
  constructor(x,y,v_x,v_y,mass,id,res){
    this.radius = Math.sqrt(mass);
    this.particle = new PointParticle(x,y,v_x,v_y,mass,id,this.radius,res)
  }

  draw = function(){
    circle(this.particle.pos.x,this.particle.pos.y,2*this.radius)
  }

  update = function(){
    this.draw();
  }
}

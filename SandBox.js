var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1000  //sets the height and width of the canvas
canvas.height = 800;
c.translate(canvas.width/2,canvas.height/2)

properties = {timestep : 1, x_min : -1*canvas.width/2, x_max : canvas.width/2, y_min : -1*canvas.height/2, y_max : canvas.height/2,
  BoundaryConditions : "solid",
  TwoBodyForces : true,
  NewtonGravity : true,
  UniformGravity : false,
};

world = new World(properties);

class Circle{
  constructor(x,y,v_x,v_y,mass,id,res){
    this.radius = Math.sqrt(mass);
    this.particle = new PointParticle(x,y,v_x,v_y,mass,id,this.radius,res)
  }

  draw = function(){
    c.beginPath();
    c.arc(this.particle.pos.x,this.particle.pos.y,this.radius,0,2*Math.PI);
    c.stroke();
  }

  update = function(){
    this.draw();
  }
}

p1_render = new Circle(0,-50,0.5,0,100,"Particle_1",0.9)
world.addobject(p1_render.particle);

p2_render = new Circle(0,50,-0.5,0,100,"Particle_2",0.9)
world.addobject(p2_render.particle);
p3_render = new Circle(50,0,0,0.5,100,"Particle_3",0.9)
world.addobject(p3_render.particle);
p4_render = new Circle(-50,0,0,-0.5,100,"Particle_4",0.9)
world.addobject(p4_render.particle);

let particleArr = [];
let clicker = 0
canvas.addEventListener('click', function(e){
  let mouse = {x: (e.x - canvas.width/2), y: (e.y - canvas.height/2)}
  let Pholder = new Circle(mouse.x,mouse.y,0,0,200,"swarm"+clicker,0.9)
  particleArr.push(Pholder)
  world.addobject(Pholder.particle);
  clicker++
})




function refresh() {																														//This refresh function controls the animation loop.
	requestAnimationFrame(refresh);
	c.clearRect(-canvas.width/2,-canvas.height/2,canvas.width, canvas.height);

  p1_render.update();
  p2_render.update();
  p3_render.update();
  p4_render.update();

  for (var i = 0; i<particleArr.length; i++){
    particleArr[i].update();
  }
  world.updateWorld();																//Clear the page each frame
}
refresh();

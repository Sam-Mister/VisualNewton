let particleArr = [];
let clicker = 0
let button1;
let button2;
let cnv;
let MassSlider;

function setup() {
  cnv = createCanvas(800, 600);
  cnv.mouseClicked(addParticle);
  properties = {timestep : 1, x_min : -1*canvas.width/2, x_max : canvas.width/2, y_min : -1*canvas.height/2, y_max : canvas.height/2,
    BoundaryConditions : "Periodic",
    TwoBodyForces : true,
    NewtonGravity : true,
    UniformGravity : false,
  };

  world = new World(properties);

  button1 = createButton('Gravity');
  button1.position(820,50);
  button1.mousePressed(GravChange);

  button2 = createButton('Forces');
  button2.position(820,100);
  button2.mousePressed(ForceChange);

  MassSlider = createSlider(50,500,100);
  MassSlider.position(820,150)
}

function draw() {
  translate(canvas.width/2,canvas.height/2)
  background(50);
  for (var i = 0; i < particleArr.length; i++){
    particleArr[i].update();
  }
  world.updateWorld();
}

function addParticle(){
  let mass = MassSlider.value();
  let Pholder = new Circle((mouseX-canvas.width/2),(mouseY - canvas.height/2),0,0,mass,"swarm"+clicker,0.9)
  particleArr.push(Pholder)
  world.addobject(Pholder.particle);
  clicker++
}
function GravChange(){
  world.UniformGravity = toggle(world.UniformGravity);
}

function ForceChange(){
  world.TwoBodyForces = toggle(world.TwoBodyForces);
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

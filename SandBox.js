var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 500  //sets the height and width of the canvas
canvas.height = 500;
c.translate(canvas.width/2,canvas.height/2)
world = new World(1);

class Circle{
  constructor(x,y,v_x,v_y,mass,id){
    this.particle = new PointParticle(x,y,v_x,v_y,mass,id)
    this.radius = 10;
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

p1_render = new Circle(0,0,0,0,100,"Particle_1")
world.addobject(p1_render.particle);
p2_render = new Circle(0,100,1,0,10,"Particle_2")
world.addobject(p2_render.particle);



function refresh() {																														//This refresh function controls the animation loop.
	requestAnimationFrame(refresh);
	c.clearRect(-canvas.width/2,-canvas.height/2,canvas.width, canvas.height);
  p1_render.update();
  p2_render.update();
  world.updateWorld();																//Clear the page each frame
}
refresh();

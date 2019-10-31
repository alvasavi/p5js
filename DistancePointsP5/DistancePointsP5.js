// Global variables
var numPoints = 50;
var backgroundColor = '#EF3E4A';
var backgroundColors = ['#EF3E4A', '#1539CF', '#FF9966', '#189BA3', '#008FD3', '#CDFF06', '#FFD101', '#5C22FF'];
var particleColor = '#95CCD0';
var particles = new Array();
var pointSlider, outputNumPoints;

   

function setup() {
    createCanvas(displayWidth, displayHeight);

  // Random bg button listener
  document.querySelector('[data-id="randomBg"]').addEventListener("click", changeBg);
  pointSlider = document.querySelector('[data-id="pointSlider"]');
  pointSlider.addEventListener("input", updatePoints);
  outputNumPoints = document.querySelector('[data-id="outputNumPoints"]');
  outputNumPoints.innerHTML = pointSlider.value;
   
   // Init particle Array
  initParticleArray();

}

function draw() {
  background(backgroundColor);

  for(var i = 0; i < numPoints; i++){
    var p = particles[i];
    
    // Update position
    p.update();
    for(var j = 0; j < numPoints; j++){
    var p2 = particles[j];
    
    if(i != j){
       // Calculate distance
       var dst = dist(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
        if(dst < 150){
         strokeWeight(1);
         stroke(255, 50);
         line(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
        }
      }
      
    }
    
    p.render();
    
    if( p.isDead() ){
    particles.splice(i, 1);
    particles.push( new Particle() );
  }
    
  }
} //eo draw

function initParticleArray(){
  for(var i = 0; i < numPoints; i++){
    particles.push( new Particle() );
  }
}

function updateParticleArray(n){
  // particles.length = n;
  for(var i = 0; i < n; i++){
    particles.push( new Particle() );
  }
}

function changeBg(e){
  var newColorIndex = Math.floor(random(backgroundColors.length));
  backgroundColor = backgroundColors[newColorIndex];
  background(backgroundColor);
}

function updatePoints(e){
  var newNumPoints = e.target.value;
  updateParticleArray(updateNumPoints(newNumPoints));
}

function updateNumPoints(newNumPoints){
  outputNumPoints.innerHTML = newNumPoints;
  numPoints = newNumPoints;
  return numPoints;
}

/* Particle Class */
function Particle() {
  
  this.loc = createVector(random(displayWidth), random(100, displayHeight-100));
  this.vel = createVector(random(-2,2), random(-1, 1));
  this.c = color(particleColor);
  
  this.update = function() {
    this.loc.add(this.vel);
  }
  
  this.render = function() {
    stroke(this.c);
    strokeWeight(7);
    point(this.loc.x, this.loc.y);
  }
  
  this.isDead = function() {
    if (this.loc.x < 0 || this.loc.x > displayWidth || this.loc.y < 0 || this.loc.y > displayHeight){
      return true;
    }else{
      return false;
    }
  }

}
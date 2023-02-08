//the passport-----------------------------------------------
let photo;
let papgWidth=500,papgHeight=400;
let papgOrX=-460,papgOrY=-papgHeight/2;
let photoWidth=144,photoHeight=197;
//pagebg shader--------------
let theShader;
let pageTexture;
let theta = 0;
let _x=480,//the circle position
    _y=385;

let mode = 0;
let scrollSpeed=0;
let sPhoto;
let textIndex;
let nameWords = []; 
let randomNum=0;

let couWords=[];
let bold,thick,small;

let words = [];
let ranWords;
let index = 0;
let wordsH=290; //height of text contents 
let wordsP=95; //width of text contents 

let canvas;
let slider;
let d=1;


function preload() {
  sPhoto=new Sc(photoWidth-1,photoHeight-3);
  sPhoto.preload();
  coverTexture=loadImage('pictures/pass.jpg');
  theShader = loadShader('shader/texture.vert','shader/texture.frag');
  bold=loadFont('fonts/Kazesawa-Bold.ttf');
  thick=loadFont('fonts/verdana.ttf');
  ranWords= loadJSON("words.json");
}

function setup() {
  sPhoto.setup();
  canvas =createCanvas(windowWidth,windowHeight,WEBGL);
  photoPg = createGraphics(photoWidth,photoHeight,WEBGL); 
  pageTexture = createGraphics(410, 400, WEBGL);
  pageTexture.noStroke();
  for(let i=0; i<100; i++){
  words.push(random(ranWords.adj));
  }
  nameWords.push("NOBODY", "EMMA","Z$OE","NOBODY","OLI*VER","WI&&IAM");
  couWords.push("UNITED STATE", "UTOPIA","MARS","PARK","HEAVEN");

}

function draw(){
  
  canvas.mouseMoved(changeNum);
  if(mouseIsPressed){
    scrollSpeed=0;
  }
//page---------------------
  //paper texture
  push();
  translate(papgOrX,papgOrY);//control the passport pos
    push();
    pageTexture.shader(theShader);
    theShader.setUniform("resolution", [width, height]);
    theShader.setUniform("time", millis() / 1000.0);
    theShader.setUniform("mouse", [_x, map(_y, 0, height, height, 0)]);
    pageTexture.rect(0,0,width,height);
    texture(pageTexture);
    push()
    translate(-540, -300, 0);
    rotateZ(theta * _x * 0.0001);
    rotateX(theta * _x * 0.0001);
    rotateY(theta * _x * 0.0001);  
    theta += 0.1;
    pop();
    rect(0,0,papgWidth,papgHeight, 20);
    pop();
  //paper color      
    push();
    fill(235,225,217,220);
    rect(0,0,papgWidth,papgHeight,20); 
    pop();
  
  pop();

// text--------------------
  //title
  fill(120,84,105,220);
  textSize(16);
  textFont(bold);
  text('United Kingdom of Great Britain and Northern Ireland', -430, -180);
  text('Passport', -435, -153);
  textFont(thick);
  text('Passport', -360, -151);
  //para
  push();
  fill(66,56,50,230);
  textSize(15);
  textFont(thick);
  textAlign(LEFT, TOP);  
  //contents
  push();
  translate(-380,-150);
  getWords();
  pop();
  //small contents
  fill(100,74,80);
  push();
  textSize(6);
  translate(-365,-155);
  getSmWords();
  pop();
  
//photo ------------------
  //shandow
  push();
  photoPg.noStroke();
  photoPg.fill(150,130,160,10);
  photoPg.rect(-photoPg.width/2,-photoPg.height/2,photoPg.width,photoPg.height);
  image(photoPg,-439,-133); //change the shandow pos
  pop();

  text(nameWords[textIndex], -285, -93);
  text(couWords[textIndex], -77, 23);

  push();
  translate(-365,-35);
  sPhoto.draw();
  pop();
  
//gradient
  push();
  translate(-460,-200);
  c1 = color(255,255,255,0);
  c2 = color(245,229,205,255);
  for(let y=0; y<125; y++){
    n = map(y,0,135,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    strokeWeight(1);
    rect(10,273,480,y);
  }
  pop();
//cover---------------
  push();
  texture(coverTexture);
  translate(250,0);
  box(280,400,10);
  pop();  

  push();
  fill(255);
  text('CLICK TO STOP',-250, 300);
  pop();
}

function changeNum() {
  scrollSpeed=1;
  textIndex=(textIndex+1)%nameWords.length;
  index=(index+1)%words.length;
}



function getWords() {
  text("P                  WRD                 0175", wordsP, wordsH * 0);
  text(words[index],wordsP, wordsH * 0.1);
  text(words[index+1],wordsP, wordsH * 0.3);
  text(words[index+2]+'  '+'/'+words[index]+'     '+'0',wordsP, wordsH * 0.4);
  text('N'+' '+words[index+3],wordsP, wordsH * 0.5);
  text('32'+' '+words[index+4]+' '+'/'+'12',wordsP, wordsH * 0.6);
  text('PASSPORT',wordsP*3.2, wordsH * 0.7);
  text('32'+' '+words[index-1]+' '+'/'+words[index-2],wordsP, wordsH * 0.8);
  push();
  fill(10,9,8);
  text('P'+'<'+words[index-3]+'<<'+' '+'<<<<<<<<<<<<<<<<<<<<<<<<<<<<',-60, wordsH * 0.95);
  text('0447385577993<33743802'+'<<<<<<<<<<<<<<<<<<<<<',-60, wordsH * 1.05);
  pop();
}

function getSmWords() {
  text("P                  WRD                 0175", wordsP, wordsH * 0);
  text(words[index],wordsP, wordsH * 0.1);
  text(words[index+1],wordsP, wordsH * 0.3);
  text(words[index+2]+'  '+'/'+words[index]+' '+'0',wordsP, wordsH * 0.4);
  text('N'+' '+words[index+3],wordsP, wordsH * 0.5);
  text('32'+' '+words[index+4]+' '+'/'+'12',wordsP, wordsH * 0.6);
  text('PASSPORT',wordsP*3.2, wordsH * 0.7);
  text('32'+' '+words[index-1]+' '+'/'+words[index-2],wordsP, wordsH * 0.8);
}



function addGUI()
{
  //add a slider
  slider = createSlider(0, 1, 0);
  slider.position(1050, 330);
  slider.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider.parent("gui-container");
}



class Sc{
constructor(w,h){ 
  this.y1=0;
  this.y2;
  this.bgImg;
  this.pg;
  this.capture;
  this.w=w;
  this.h=h;
}
preload(){
  this.bgImg = loadImage("pictures/1.jpg");
}
 setup() { 
  this.pg=createGraphics(width,height);
  this.y2 = this.pg.height;
  this.capture = createCapture(VIDEO);
  this.capture.hide();
} 
 draw() { 
  this.pg.image(this.bgImg, 0, this.y1, this.pg.width, this.pg.height);
  this.pg.image(this.capture, 0, this.y2,this.pg.width, this.pg.height);
  this.y1 -= scrollSpeed;
  this.y2 -= scrollSpeed;
  if (this.y1 < -this.pg.height){
    this.y1 = this.pg.height;
  }
  if (this.y2 < -this.pg.height){
    this.y2 = this.pg.height;
  }
  texture(this.pg);
  noStroke();
  plane(this.w,this.h);
  }
}
var spiderman  , spidermanImg;
var tower, towerImg ;
var invisibleblock1 , invisibleblock2 ;
var PLAY = 1;
var END = 0 ;
var gameState = PLAY ;
var over , overImg ;
var rs , rsImg ; 
var venom , venomImg , venomGroup;
var lizard , lizardImg , lizardGroup ;
var vulture , vultureImg , vultureGroup ;
var sling , slingImg ;
var shoot , shootImg;
var net , netImg , netGroup ;
var slingsound ;
var score = 0 ;

function preload(){

towerImg = loadImage("tower.png");
spidermanImg = loadImage("unnamed.gif");
overImg = loadImage("endimg.jpg");
rsImg = loadImage("restatrt.png");
venomImg = loadImage("venom.png");
lizardImg = loadImage("lizard.png");
vultureImg = loadImage("vulture.png");
slingImg = loadImage("sling.png");
shootImg = loadImage("loot.png");
netImg = loadImage("net.png");
slingsound = loadSound("spider_man_web_shot.mp3");

}
function setup(){
createCanvas(600,500);

  

tower = createSprite(300,300);
tower.addImage(towerImg);

spiderman = createSprite(300,400);
spiderman.addImage(spidermanImg);
spiderman.scale = 0.3;

over = createSprite(350,280);
over.addImage(overImg);
over.scale = 0.8;

 
  
  
rs = createSprite(100,120);
rs.addImage(rsImg);

shoot = createSprite(200,200);
shoot.addImage(shootImg);
  
invisibleblock1 = createSprite(500,300,5,600);
invisibleblock2 = createSprite(110,300,5,600);
invisibleblock1.visible = false;
invisibleblock2.visible = false;
shoot.visible = false;

venomGroup = new Group();
lizardGroup = new Group();
vultureGroup = new Group();
netGroup = new Group();
spiderman.debug = true;
spiderman.setCollider("rectangle",0,0,spiderman.width,spiderman.height);
  lizardGroup.debug = true;
   
}
function draw(){
  background("black");
 
 
tower.velocityY = 5 + score/10
if(tower.y>400){

tower.y = 300

}
 
  
if(gameState === PLAY){
  
    

  shoot.velocityY = -11
  

  if(shoot.isTouching(venomGroup)){
    
    venomGroup.destroyEach();
     score = score + 2  
    
  }
  
  if(shoot.isTouching(lizardGroup)){
    
    lizardGroup.destroyEach();
         score = score + 2  

  }
  
  if(shoot.isTouching(vultureGroup)){
    
    
    vultureGroup.destroyEach();
         score = score + 2  

  }
  
  
  if(keyWentDown("space")){
    
    spiderman.addImage(slingImg)
    spiderman.scale = 0.07         
    shoot.visible = true
    shoot.x = spiderman.x
    shoot.y = spiderman.y  
    shoot.scale = 0.5;  
    slingsound.play()
  }
  
  if(keyWentUp("space")){
    
    spiderman.addImage(spidermanImg)
    spiderman.scale = 0.3
    
  }
  

if(keyDown("left_arrow")){

spiderman.x = spiderman.x - 3

}

if(keyDown("right_arrow")){

spiderman.x = spiderman.x + 3

}

 
if(keyDown("up_arrow")){

spiderman.velocityY = -6

}

spiderman.velocityY = spiderman.velocityY +0.8

  if(spiderman.isTouching(venomGroup) || spiderman.isTouching(lizardGroup) || spiderman.isTouching(vultureGroup)){
    
   spiderman.destroy();
    gameState = END;
    
  }
  
  
  
if(spiderman.y>550){

spiderman.destroy();
 gameState = END;
  
  

}
over.visible = false;
rs.visible = false;
  
} 

if(gameState === END){

  
tower.velocityY = 0;
rs.visible = true;
over.visible = true;
venomGroup.destroyEach();
lizardGroup.destroyEach();
vultureGroup.destroyEach();
venomGroup.velocityY = 0;
lizardGroup.velocityY = 0;
vultureGroup.velocityY = 0;
netGroup.destroyEach();
shoot.visible = false
score = 0;
   if(mousePressedOver(rs)){
    
    reset();
    
  }
}

spawnNet();
spawnVenom();
spiderman.collide(invisibleblock1);
spiderman.collide(invisibleblock2);
spiderman.collide(netGroup)

drawSprites();
text("Score:"+ score,500,20);
}
function reset(){
  
  gameState = PLAY;
  rs.visible = false;
  over.visible = false;
   tower.velocityY = 2
  
  
 spiderman = createSprite(300,400)
spiderman.addImage(spidermanImg)
spiderman.scale = 0.3

}
function spawnVenom(){
  
  if(frameCount %300 === 0){
    
    venom = createSprite(200,-30);
    venom.addImage(venomImg);
    venom.scale = 0.47
    venom.velocityY = 5 + score/10
    venom.x = Math.round(random(120,450))
    venom.lifetime = 250;
    venomGroup.add(venom);
    
  }

  if(frameCount %670 === 30){
    
     lizard = createSprite(30,-30);
  lizard.addImage(lizardImg);
  lizard.scale = 0.4;
  lizard.velocityY = 5 + score/10;
  lizard.x = Math.round(random(120,460));
  lizard.lifetime = 250;
  lizardGroup.add(lizard);
  }
  
  if(frameCount %970 === 0){
    
     vulture = createSprite(0,-30);
  vulture.addImage(vultureImg);
  vulture.scale = 0.15;
  vulture.velocityY = 5 + score/10;
  vulture.x = Math.round(random(120,460))
  vulture.lifetime = 250;
  vultureGroup.add(vulture);
  }
  
}
function spawnNet(){
  
  if(frameCount %400 === 0){
   net = createSprite(140,-40)
  net.addImage(netImg)
  net.scale = 0.25
  net.velocityY = 5 + score/10;
  net.lifetime = 280
  netGroup.add(net)
  
  
  }
  
 

 
}
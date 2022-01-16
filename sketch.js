var PLAY = 1;
var END = 0;

var gameState = PLAY;
var trex, trex_running, edges;

var groundImage;
var  stickman, stickman_running;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score;

var gameOverImg,restartImg;
var jumpSound , checkPointSound , dieSound
function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage = loadImage("ground2.png");
 cloudImage = loadImage("cloud.png"); 
 stickman_running = loadAnimation("stickman-running-1.png","stickman-running-2.png","stickman-running-3.png","stickman-running-4.png","stickman-running-5.png");

obstacle1 = loadImage("rock1.png");
obstacle2 = loadImage("rock2.png");
obstacle3 = loadImage("rock3.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");

jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkPoint.mp3")

}

function setup(){
  createCanvas(600,200);
    stickman = createSprite(50,180,20,50);
   stickman.addAnimation("running",stickman_running) 
  edges = createEdgeSprites();
    stickman.scale = 0.2;
   stickman.x = 50;
   
   ground = createSprite(200,180,400,20);
   ground.addImage("ground",groundImage);
   ground.x = ground.width/2
   ground.velocityX = -4;

   gameOver = createSprite(300,100);
   gameOver.addImage(gameOverImg);
restart = createSprite(300,140);
restart.addImage(restartImg);
gameOver.scale = 0.5;
restart.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

obstaclesGroup = new Group()
cloudsGroup = new Group()


 console.log("Hello"+5);
 score = 0;
  
} 


function draw(){
background(180);
text("  Score:"+ score, 500,50);
score = score + Math.round(frameCount/60);


if(gameState === PLAY){
gameOver.visible = false;
restart.visible = false;
  ground.velocityX = -(4 + 3* score/300);
  score = score + Math.round(getFrameRate()/60);
  if(score>0 && score%100 === 0){
    checkPointSound.play()
  }

  if(groundImage.x < 0){
    ground.x = ground.width/2;
  }

}

else if(gameState === END){
  ground.velocityX = 0;
}
ground.velocityX = -2;

console.log()

if(keyDown("space") && stickman.y >=100){
  stickman.velocityY = -12;
  jumpSound.play();
}

stickman.velocityY = stickman.velocityY + 0.8;




if (ground.x<0){
  ground.x = ground.width/2;  
}




stickman.collide(invisibleGround);

spawnClouds();

spawnObstacles(); 

if(obstaclesGroup.isTouching(stickman)){
  jumpSound.play();
  gameState = END;
  dieSound.play();

}
else if(gameState === END){
  gameOver.visible = true;
  restart.visible = true;

ground.velocityX = 0;
stickman.velocityY = 0;

obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0); 

}

if(mousePressedOver(restart)) {
  reset();
}


drawSprites();
}

function reset(){
  

}

 


function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
 
    
     // //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
              default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.08;
     obstacle.lifetime = 300;
    
    //adding obstacles to the group
    obstaclesGroup.add(obstacle);
  
  }
 }
 function spawnClouds()  {
  if(frameCount % 60 === 0){
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    

  
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.5;
    cloud.velocityX = -3;    

    cloud.lifetime = 134;

    cloud.depth = stickman.depth;
    stickman.depth = stickman.depth + 1;

    cloudsGroup.add(cloud)
  }
}













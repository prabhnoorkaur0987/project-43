var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg=loadImage("banana.png")
obstaImage=loadImage("stone.png")
gameoverImg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  gameover=createSprite(200,200,20,20)
  gameover.scale=0.5
  gameover.addImage(gameoverImg)
  FoodGroup=new Group()
  obstaGroup=new Group()
}

function draw() { 
  background(0);
  
  if(gameState===PLAY){
    gameover.visible=false
  spawnFood()
  spawnObstacles()
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(FoodGroup.isTouching (player)){
    FoodGroup.destroyEach()
    score=score+2
    player.scale+=0.1
  }
  if(obstaGroup.isTouching(player)){
gameState=END
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
else if(gameState===END){
  obstaGroup.destroyEach()
  FoodGroup.destroyEach()
  backgr.velocityX=0
  player.visible=false

  gameover.visible=true
  if(mousePressedOver(gameover)){
    gameState=PLAY
    player.visible=true
    backgr.velocityX=-4
  }
}

  drawSprites();
  fill (255)
  textSize(30)
text("score:"+score,50,100)
  function spawnFood(){
  if (frameCount%50===0){
   banana=createSprite(300,250,40,10)
    banana.y=random(100,200)
    banana.addImage(bananaImg)
    banana.scale=0.05
    banana.velocityX=-4
    banana.lifetime=300
    player.depth=banana.depth+1
FoodGroup.add(banana)
  }
}
function spawnObstacles(){
if(frameCount%90===0){
  obstacle=createSprite(200,350,20,20)
  obstacle.x=random(300,400)
  obstacle.addImage(obstaImage)
  obstacle.scale=0.2
  obstacle.velocityX=-4
  obstacle.lifetime=300
  player.depth=obstacle.depth+1
obstaGroup.add(obstacle)
}
}
}

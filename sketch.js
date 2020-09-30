var monkey, player_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var backGround, backgroundImage;
var invisibleGround;
var score = 0;

function preload() {
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
}

function setup() {
  createCanvas(800, 400);
  backGround = createSprite(400, 200, 800, 400);
  backGround.addImage(backImage);
  backGround.scale = 1.6 ;
  backGround.velocityX = -4;
  backGround.width = backGround.width /2;

    
  
  monkey = createSprite(20, 470, 10, 10);
  monkey.addAnimation("running",player_running);
  monkey.scale = 0.1;

  invisibleGround = createSprite(10, 500, 50, 20);
  invisibleGround.visible = false ;

  obstacleGroup = new Group();
  bananaGroup = new Group();

}

function draw() {
  background(220);        
  
  monkey.collide(invisibleGround);
  
  if(backGround.x<0)
   {
     backGround.x = 400;
     backGround.y = 200;
   }
  
   camera.position.x = monkey.position.x;
   camera.position.y = monkey.position.y;
  
  if (keyDown("space") && monkey.y >= 315 ) {
    monkey.velocityY = -20;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  spawnObstacles();

  spawnBanana();

  if (bananaGroup.isTouching(monkey)) {
    score = score + 2;
    bananaGroup.destroyEach();
    monkey.scale = monkey.scale + 0.02;
  }

  if (obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.1;
    obstacleGroup.destroyEach();
  }

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white")
  text("Score:" + score, -250, 310);
}

function spawnBanana() {
  if (World.frameCount % 150 === 0) {
    var rand = random(200,300);
    banana = createSprite(820, rand, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 820 / 4;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (World.frameCount % 170 === 0) {
    var rand = random(1,6)
    obstacle = createSprite(820, 460, 10, 10)
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.velocityX = -rand;
    obstacle.lifetime =820/ 6;
    obstacleGroup.add(obstacle);
  }
}
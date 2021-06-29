var trex, animation, ground;
var score = 0
var gameState = "play"
//loads animation, images and sound
function preload(){
  TrexAlive = loadAnimation("trex1.png","trex3.png","trex4.png")
  
  floor = loadImage("ground2.png")
  StormyCloud=loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trexisdead = loadAnimation("trex_collided.png")
  GameOver = loadImage("gameOver.png")
  Restart = loadImage("restart.png")
  TrexJump = loadSound("jump.mp3")
  Dead = loadSound("die.mp3")
  Every100Score = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(50,180,20,20)
  trex.addAnimation("trex", TrexAlive)
  trex.addAnimation("trexdead", trexisdead)
  trex.scale = 0.5
  
  trex.debug = false
  trex.setCollider("circle",0,0,40)
  
  ground = createSprite(300,180,600,20)
  ground.addImage(floor)
  ground2 = createSprite(300,190,600,20)
  ground2.visible=false
  GameOver1= createSprite(300,100,20,20)
  Restarting= createSprite(300,130,20,20)
  GameOver1.addImage(GameOver)
  Restarting.addImage(Restart)
  GameOver1.scale = 0.5
  Restarting.scale = 0.4
  
  ObstacleFamily = createGroup()
  CloudsFamily = createGroup()
}

function draw(){
  background(188)
  if(gameState==="play") {
    ObstacleOne()
    score = score+Math.round(getFrameRate()/60)
    if(keyDown("space")&&trex.y>156) {
      TrexJump.play()
      
    trex.velocityY = -6
  }
    if(trex.isTouching(ObstacleFamily)) {
      Dead.play()
      gameState = 'end'
    }
    if(score%100===0&&score>0){
      Every100Score.play() 
    }
  
  trex.velocityY = trex.velocityY+0.2
    ground.velocityX = -(3+score/30)
  
  if(ground.x<0) {
    ground.x = ground.width/2
  }
    
    DarkCloud()
    GameOver1.visible=false
    Restarting.visible=false
    
  }
  if(gameState==="end") {
    ground.velocityX = 0
    CloudsFamily.setVelocityXEach(0)
    ObstacleFamily.setVelocityXEach(0)
    CloudsFamily.setLifetimeEach(-1)
    ObstacleFamily.setLifetimeEach(-1)
    trex.changeAnimation("trexdead", trexisdead)
    GameOver1.visible=true
    Restarting.visible=true
    trex.velocityY=0
    if(mousePressedOver(Restarting)){
      score = 0
      gameState = "play"
      ObstacleFamily.destroyEach()
      CloudsFamily.destroyEach()
      trex.changeAnimation("trex", TrexAlive)
    }
  }
  
  
  text("SCORE :"+score,500,50)
  
  
  trex.collide(ground2)
  
  
  
  
  
  drawSprites()
}

function DarkCloud() {
  if(frameCount%60===0) {
  Cloud = createSprite(600,random(30,100),90,90)
  Cloud.velocityX = -3
    Cloud.addImage(StormyCloud)
    Cloud.scale = 0.7
    
    trex.depth=Cloud.depth+1
    Cloud.lifetime = 300
    CloudsFamily.add(Cloud)
    
}
}
function ObstacleOne() {
  if(frameCount%110===0) {
  Obstacle = createSprite(600,165,90,90)
  Obstacle.velocityX = -(3+score/30)
  ObstacleFamily.add(Obstacle)
    Obstacle.scale = 0.5
    var Obby = Math.round(random(1,6))
switch(Obby) {
  case 1 : Obstacle.addImage(obstacle1)
    break
    case 2 : Obstacle.addImage(obstacle2)
    break
    case 3 : Obstacle.addImage(obstacle3)
    break
    case 4 : Obstacle.addImage(obstacle4)
    break
    case 5 : Obstacle.addImage(obstacle5)
    break
    case 6 : Obstacle.addImage(obstacle6)
    break
}
    Obstacle.lifetime = 300
}
  }
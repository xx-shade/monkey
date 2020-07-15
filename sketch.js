//Global Variables
var bpng, jpng, spng, mpng, gpng, rpng, gopng, monkey, jungle, stone
var score, invisg
var banana,play,end,gamestate,bananagroup,stonegroup,go,restart

function preload(){
  bpng = loadImage("Banana.png")
  jpng = loadImage("jungle.jpg")
  spng = loadImage("stone.png")
  mpng = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  gpng = loadImage("ground.jpg")
  rpng = loadImage("restart.png")
  gopng = loadImage("gameOver.png")
}


function setup() {
  createCanvas(400,400);
  jungle = createSprite(500,200,800,20)
  jungle.addImage(jpng)
  jungle.velocityX = -3
  monkey = createSprite(30,340,20,20)
  monkey.addAnimation("lol",mpng)
  monkey.scale = 0.08
  score = 0
  invisg = createSprite(30,400,200,20)
  invisg.visible = false
  play = 1
  end = 0
  gamestate = play
  bananagroup = createGroup();
  stonegroup = createGroup();
  go = createSprite(200,200,20,20)
  go.addImage(gopng)
  restart = createSprite(200,300,20,20)
  restart.addImage(rpng)
  go.visible = false
  restart.visible = false
  
}


function draw(){
 background("white")
  
  if(gamestate === play){
  if(keyDown("space") && monkey.y>359){
     monkey.velocityY = -15
     }
  monkey.velocityY = monkey.velocityY + 1
 
  bgf();
  sgf();
    if(bananagroup.isTouching(monkey)){
    score = score+2
    bananagroup.destroyEach();
    }
  if(stonegroup.isTouching(monkey)){
  gamestate = end
  }
 }
 else if(gamestate === end){
monkey.velocityY=0
   bananagroup.setVelocityXEach(0)
  stonegroup.setVelocityXEach(0)
 bananagroup.setLifetimeEach(-1)
  stonegroup.setLifetimeEach(-1)
  go.visible = true
  restart.visible = true
    
  }
   if(jungle.x<0){
  jungle.x = jungle. width / 2
  }
  monkey.collide(invisg)
  if(mousePressedOver(restart)){
  reset()
  }
  drawSprites();
  
   text("Score : " + score, 320,20)
 
}

function sgf(){

if(frameCount%100===0){
stone = createSprite(400,350,20,20)
stone.addImage(spng)
stone.scale = random(0.2,0.3)
stone.velocityX = -7
  stone.debug = true
  stone.setCollider("circle",20,20,150)
  stonegroup.add(stone)
}





}

function bgf(){

if(frameCount%100===0){
  banana = createSprite(400,350,20,20)
  banana.addImage(bpng)
  banana.y = random(250,390)
  banana.scale = 0.05
  banana.velocityX = -3
  bananagroup.add(banana)
}
  


}
function reset(){
gamestate = play;
  
  go.visible = false;
  restart.visible = false;
  
  bananagroup.destroyEach();
  stonegroup.destroyEach();
  
 
  
  score = 0;
}
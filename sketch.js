var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
//Atividade: criar as variáveis das núvens
var fumaca,imagemFumaca,fumacaas;
var pontos;
var jogando = 1;
var fim = 0;
var estado = jogando;

var parede1;
var parede2;
var parede3;
var parede4;
var parede5;
var parede6;
var paredes;

var newImage;
var gameOver;
var morto;
var restart;
var morreu;
var pontou;
var pulo;;
var restartNaTela;
var gameOverNaTela
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  parede1 = loadImage("obstacle1.png");
  parede2 = loadImage("obstacle2.png");
  parede3 = loadImage("obstacle3.png");
  parede4 = loadImage("obstacle4.png");
  parede5 = loadImage("obstacle5.png");
  parede6 = loadImage("obstacle6.png");
  morto = loadAnimation("trex_collided.png");
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  groundImage = loadImage("ground2.png");
  morreu = loadSound("die.mp3");
  pontou = loadSound("checkPoint.mp3");
  pulo = loadSound("jump.mp3");
  //Atividade: carregar a imagens da núvem
  imagemFumaca = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  paredes = createGroup ();

  fumacaas = createGroup ();

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", morto);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
 gameOverNaTela = createSprite (300,100);
gameOverNaTela.addImage (gameOver); 
restartNaTela = createSprite (300,140);
restartNaTela.addImage (restart);
restartNaTela.scale = 0.3
  //Espaço de colisão 
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  pontos=0
}

function draw() {
  //Atividade: escolha a cor de fundo
  background("white");
  text (pontos,500,50 );
  if (estado == jogando) {
    gameOverNaTela.visible=false;
    restartNaTela.visible=false;
    ground.velocityX = -(4 + 3* pontos/100);
     
  pontos+=Math.round(frameCount/60);
  //Atividade: faça com que o trex não saia da tela com o pulo
    if (keyDown("space")&&trex.y>=100) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
if (mousePressedOver(restartNaTela)) {
  console.log("potatomunhanho");
}
  //Atividades: chmar a função que desenha as núvens
desenhaFumaca(); 
 cactos();
 if (paredes.isTouching(trex)) {
  estado = fim ;
 morreu.play();
 }
}
if (estado == fim) {
  gameOverNaTela.visible=true;
  restartNaTela.visible=true;
  trex.changeAnimation("collided", morto);
  ground.velocityX = 0;
  fumacaas.setVelocityXEach (0);
  paredes.setVelocityXEach (0);

}
//Evita a colisão com o chão
trex.collide(invisibleGround);
  drawSprites();
}
//Atividade: chamar a função que cria as núvens
function desenhaFumaca() {
  fumaca=createSprite(600,100,40,10);
  fumaca.addImage(imagemFumaca);
  fumaca.y = Math.round(random(10,60));//pega um número aleatório para posição y a núvem
  fumaca.velocityX=-300;
  fumacaas.add(fumaca);
}
function cactos() {
  if (frameCount%60==0) {
    var cact = createSprite(400,165,10,40);
     cact.velocityX=-6;
     var randon=Math.round(random(1,6));
     switch (randon) {
      case 1:cact.addImage (parede1);
        break;
        case 2:cact.addImage (parede2);
        break;
        case 3:cact.addImage (parede3);
        break;
        case 4:cact.addImage (parede4);
        break;
        case 5:cact.addImage (parede5);
        break;
        case 6:cact.addImage (parede6);
        break;
      default:
        break;
     }
     cact.scale=0.5;
     cact.lifetime=300;
     paredes.add (cact);
  }
} 
 function potato() {
  estado = jogando;

  gameOverNaTela.visible=false;
  restartNaTela.visible=false;
  pontos=0;
trex.changeAnimation("run");
paredes.destroyEach ();
fumacaas.destroyEach ();
trex.velocityY=0;
ground.x = ground.width / 2;
 }
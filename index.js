var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
const SIZE = window.innerWidth * .4;
const MARGIN = SIZE / 20;
const STEP = SIZE / 20;
const TREE_WIDTH = SIZE / 10;

canvas.width = SIZE * DPR;
canvas.height = SIZE * DPR;
context.scale(DPR, DPR);
context.lineWidth = 3;
context.lineCap = "square";

// const COLOR1 = "#3D6643";
// const COLOR2 = "#C1DFD3";
const COLOR1 = "#404040";
const COLOR2 = "#FDFDFD";

const rotateDegrees = (context, degrees) => context.rotate(degrees * Math.PI/180);

const getGradient = (x1, y1, x2, y2) => {
  const grd = context.createLinearGradient(x1, y1, x2, y2);
  const modifierLeft = Math.random() * .3;
  const modifierRight = Math.random() * .3;
  grd.addColorStop(0, COLOR1);
  grd.addColorStop(.2 + modifierLeft, COLOR2);
  grd.addColorStop(.8 - modifierRight, COLOR2);
  grd.addColorStop(1, COLOR1);
  return grd;
}

const drawGradientLine = (x1, y1, x2, y2) => {
  context.beginPath();
  context.strokeStyle = getGradient(x1, y1, x2, y2);
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
}

const rotateAndDraw = (degrees, drawFn) => {
  const yIncrement = -1;
  context.translate(0, yIncrement);
  rotateDegrees(context, degrees);
  drawFn();
}

const drawBranch = (xStart, yStart, startWidth, rotation) => {
  context.save();
  context.translate(xStart,yStart);
  rotateDegrees(context, rotation);
  let rotationAmount = 0;
  let currentWidth = startWidth;

  while(currentWidth >= 0){
    currentWidth -= Math.random() / 6;
    rotationAmount += (Math.random() * 3 - 1.5);
    rotationAmount = Math.max(rotationAmount, -2.5);
    rotationAmount = Math.min(rotationAmount, +2.5);
    rotateAndDraw(rotationAmount, () => {
      drawGradientLine(currentWidth/-2, 0, currentWidth/2, 0);
    });
  }
  context.restore();
}

context.beginPath();
context.fillStyle = COLOR2;
context.fillRect(0,0,SIZE,SIZE);
context.stroke();

for(var x1=0; x1<SIZE; x1+=SIZE/10){
  for(var y1=0; y1<SIZE; y1+=SIZE/10){
    drawBranch(x1, y1, TREE_WIDTH, Math.random() * 360);
  }
}

for(var x2=0; x2<SIZE; x2+=SIZE/10){
  drawBranch(x2, 0 - SIZE / 10, TREE_WIDTH, 180);
  drawBranch(x2, SIZE + SIZE/10, TREE_WIDTH, 0);
}
for(var y2=0; y2<SIZE; y2+=SIZE/10){
  drawBranch(0 - SIZE/10   , y2, TREE_WIDTH, 90);
  drawBranch(SIZE + SIZE/10, y2, TREE_WIDTH, 270);
}

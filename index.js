var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
const SIZE = window.innerWidth * .4;
const MARGIN = SIZE / 20;
const STEP = SIZE / 20;

canvas.width = SIZE * DPR;
canvas.height = SIZE * DPR;
context.scale(DPR, DPR);
context.lineWidth = 2;

const rotateDegrees = (context, degrees) => context.rotate(degrees * Math.PI/180);

const getGradient = (x1, y1, x2, y2) => {
  const grd = context.createLinearGradient(x1, y1, x2, y2);
  const modifierLeft = Math.random() * .3;
  const modifierRight = Math.random() * .3;
  grd.addColorStop(0, "black");
  grd.addColorStop(.2 + modifierLeft, "white");
  grd.addColorStop(.8 - modifierRight, "white");
  grd.addColorStop(1, "black");
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

const drawBranch = (xStart, yStart, startWidth, length, depth) => {
  context.translate(xStart,yStart);
  const finalWidth = startWidth * (1 - ((Math.random() * .25) + .3));
  const deltaWidth = startWidth - finalWidth;
  let rotationAmount = 0;
  let scaledWidth = startWidth;

  for(y=0; y < length; y += 1){
    const percentageDone = y/length;
    scaledWidth = startWidth - (deltaWidth * percentageDone);
    rotationAmount += (Math.random() * 2 - 1) * .25;
    rotationAmount = Math.max(rotationAmount, -30);
    rotationAmount = Math.min(rotationAmount, +30);
    rotateAndDraw(rotationAmount, () => {
      drawGradientLine(scaledWidth/-2, 0, scaledWidth/2, 0);
    });
  }

  if(depth <= 1){
    context.save();
    rotateDegrees(context, Math.random() * 10 - 5)
    drawBranch(scaledWidth/4, 10, scaledWidth/2, 75, depth+1);
    context.restore();
    context.save();
    context.rotate(context, Math.random() * 30 - 15)
    drawBranch(-scaledWidth/4,10, scaledWidth/2, 75, depth+1);
    context.restore();
  }
}

drawBranch(SIZE/2, SIZE-MARGIN, 40, 150, 0);

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

const decideToBranch = (width) => {
  console.log(width);
  return width > 2;
}

const drawBranch = (xStart, yStart, startWidth, length) => {
  console.log(xStart, 'xStart');
  console.log(yStart, 'yStart');
  console.log(startWidth, 'startWidth');
  console.log(length, 'length');
  context.translate(xStart,yStart);
  let rotationAmount = 0;
  let currentWidth = startWidth;

  for(y=0; y < length; y += 1){
    if(y/length == .25 || y/length == .5 || y/length == .75){
      if(Math.random() > .8){
        context.save();
        rotateDegrees(context, Math.random() * 30 + 15)
        drawBranch(
          currentWidth * (Math.random() * .3 + .2),
          10,
          currentWidth*.66,
          length
        );
        context.restore();
      }
      if(Math.random() > .8){
        context.save();
        const degrees = Math.random() * 30 - 45;
        rotateDegrees(context, degrees);
        drawBranch(
          currentWidth * (Math.random() * .3 + .5),
          10,
          currentWidth*.66,
          length
        );
        context.restore();
      }
    }
    currentWidth -= Math.random() / 6;
    rotationAmount += (Math.random() * 3 - 1.5);
    rotationAmount = Math.max(rotationAmount, -1.5);
    rotationAmount = Math.min(rotationAmount, +1.5);
    rotateAndDraw(rotationAmount, () => {
      drawGradientLine(currentWidth/-2, 0, currentWidth/2, 0);
    });
  }

  // if(decideToBranch(currentWidth)){
  //   context.save();
  //   rotateDegrees(context, Math.random() * 30 - 15)
  //   drawBranch(currentWidth/4, 10, currentWidth/2, 75);
  //   context.restore();
  //   context.save();
  //   context.rotate(context, Math.random() * 30 - 15)
  //   drawBranch(-currentWidth/4,10, currentWidth/2, 75);
  //   context.restore();
  // }
}

drawBranch(SIZE/2, SIZE-MARGIN, 60, 120);

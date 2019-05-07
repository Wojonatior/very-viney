var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
const SIZE = window.innerWidth * .4;
const MARGIN = SIZE / 20;
const STEP = SIZE / 20;

canvas.width = SIZE * DPR;
canvas.height = SIZE * DPR;
context.scale(DPR, DPR);
context.lineWidth = 0;

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

const rotateAndDraw = (center_x, center_y, degrees, drawFn) => {
  context.save();
  context.translate(center_x, center_y);
  context.rotate(degrees * Math.PI/180);
  drawFn();
  context.restore();
}

const drawBranch = (xStart, yStart, startWidth, length) => {
  const finalWidth = startWidth * (1 - ((Math.random() * .25) + .3));
  const deltaWidth = startWidth - finalWidth;
  let rotationAmount = 0;
  for(y=yStart; y > yStart - length; y -= 1){
    const percentageDone = 1 + ((y - yStart) / (length - yStart));
    const scaledWidth = startWidth - (deltaWidth * percentageDone);
    rotationAmount += Math.random() * 2 - 1;
    if(rotationAmount <= 0) {
      rotateAndDraw(xStart-scaledWidth/2, y, rotationAmount, () => {
        drawGradientLine(0, 0, scaledWidth, 0);
      })
    } else {
      rotateAndDraw(xStart+scaledWidth/2, y, rotationAmount, () => {
        drawGradientLine(0-scaledWidth, 0, 0, 0);
      })
    }
  }
}

drawBranch(SIZE/2, SIZE-MARGIN, 40, 200);

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
const SIZE = window.innerWidth * .33;
const MARGIN = SIZE / 20;

canvas.width = SIZE * DPR;
canvas.height = SIZE * DPR;
context.scale(DPR, DPR);
context.lineWidth = 1;

const startingWidth = canvas.width - MARGIN;
const startingHeight = canvas.height - MARGIN;
const MIN_AREA = startingWidth * startingHeight * .01;



const drawAndShrink = (currentWidth, currentHeight, count) => {
  context.strokeRect(MARGIN, MARGIN, currentWidth, currentHeight);
  const currentArea = currentWidth * currentHeight;
  const randomMult = Math.random() / 4 + .75;
  var nextWidth, nextHeight;
  if (currentArea > MIN_AREA) {
    if (Math.random() > .5){
      nextWidth = currentWidth * randomMult;
      nextHeight = currentHeight;
    } else {
      nextWidth = currentWidth;
      nextHeight = currentHeight * randomMult;
    }
    drawAndShrink(nextWidth, nextHeight, count + 1);
  }
};


drawAndShrink(startingWidth, startingHeight, 0);

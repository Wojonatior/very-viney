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

const startingWidth = canvas.width - MARGIN;
const startingHeight = canvas.height - MARGIN;
const MIN_AREA = startingWidth * startingHeight * .04;


const getFillStyle = (count) => {
  return count % 2 == 0 ? '#5C9EAD' : '#EEEEEE';
}

const getNextDimension = (currentDimension) => {
  const multipliers = [1, 2, 4];
  const index = Math.floor(Math.random() * 3);
  return currentDimension - (STEP * multipliers[index]);
}

const drawAndShrink = (currentWidth, currentHeight, count) => {
  var nextWidth, nextHeight;
  const currentArea = currentWidth * currentHeight;

  context.fillStyle = getFillStyle(count);
  context.fillRect(MARGIN, MARGIN, currentWidth, currentHeight);

  if (currentArea > MIN_AREA) {
    if (Math.random() > .5){
      nextWidth = getNextDimension(currentWidth);
      nextHeight = currentHeight;
    } else {
      nextWidth = currentWidth;
      nextHeight = getNextDimension(currentHeight);
    }
    drawAndShrink(nextWidth, nextHeight, count + 1);
  }
};

drawAndShrink(startingWidth, startingHeight, 0);

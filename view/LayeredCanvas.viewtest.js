/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import LayeredCanvas from "./LayeredCanvas.js";
import RU from "./ReactUtilities.js";

const myOnClick = () => {
  console.log(`myOnClick()`);
};

const drawFunction1 = (fillStyle) => (context0, width, height) => {
  const context = context0;
  context.save();
  context.beginPath();
  context.fillStyle = fillStyle;
  context.arc(width / 2.0, height / 2.0, width / 2.0, 0, 2.0 * Math.PI);
  context.fill();
  context.restore();
};
const drawFunction2 = (count) => (context0, width, height) => {
  if (count > 1) {
    const context = context0;
    context.save();
    context.beginPath();
    context.fillStyle = "rgba(211, 211, 211, 0.5)";
    context.arc(width / 2.0, height / 2.0, width / 4.0, 0, 2.0 * Math.PI);
    context.fill();
    context.restore();
  }
};
const drawFunction3 = (count) => (context0, width, height) => {
  if (count > 1) {
    const context = context0;
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 36px serif";
    context.fillText(count, width / 2.0, height / 2.0);
    context.restore();
  }
};

const size = 75;
const mapFunction = (count) => {
  let fillStyle;
  switch (count) {
    case 1:
      fillStyle = "red";
      break;
    case 2:
      fillStyle = "green";
      break;
    case 3:
      fillStyle = "blue";
      break;
    default:
      console.warn(`Missing fillStyle for count = ${count}`);
  }
  const drawLayerFunctions = [drawFunction1(fillStyle), drawFunction2(count), drawFunction3(count)];
  const canvas = React.createElement(LayeredCanvas, {
    drawLayerFunctions,
    backgroundColor: "OliveDrab",
    customKey: `layeredCanvas${count}`,
    height: size,
    isVerbose: true,
    onClick: myOnClick,
    title: `${count}`,
    width: size,
  });

  return RU.createCell(canvas, count);
};

const cells = [1, 2, 3].map(mapFunction);
const element = RU.createFlexboxWrap(cells);

ReactDOM.render(element, document.getElementById("panel"));

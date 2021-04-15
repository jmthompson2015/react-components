import ColorSwatch from "./ColorSwatch.js";

const color0 = { r: 255, g: 0, b: 0 };
const element0 = React.createElement(ColorSwatch, { color: color0 });
ReactDOM.render(element0, document.getElementById("panel0"));

const color1 = { r: 0, g: 255, b: 0 };
const element1 = React.createElement(ColorSwatch, { color: color1 });
ReactDOM.render(element1, document.getElementById("panel1"));

const color2 = { r: 0, g: 0, b: 255 };
const element2 = React.createElement(ColorSwatch, { color: color2 });
ReactDOM.render(element2, document.getElementById("panel2"));

const className3 = "h-75 ma1 w-75";
const color3 = { r: 255, g: 255, b: 0 };
const element3 = React.createElement(ColorSwatch, { className: className3, color: color3 });
ReactDOM.render(element3, document.getElementById("panel3"));

const color4 = { r: 255, g: 0, b: 255 };
const element4 = React.createElement(ColorSwatch, { color: color4 });
ReactDOM.render(element4, document.getElementById("panel4"));

const color5 = { r: 0, g: 255, b: 255 };
const element5 = React.createElement(ColorSwatch, { color: color5 });
ReactDOM.render(element5, document.getElementById("panel5"));

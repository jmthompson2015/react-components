const R = require("ramda");

const CssNamedColor = require("./CssNamedColor.js");
const FileWriter = require("./FileWriter.js");

const OUTPUT_FILE = "../dist/color.css";

const toDashString = (string) => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const convertBackgroundColors = (colors) => {
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.bg-${name} { background-color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertBorderColors = (colors) => {
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.b--${name} { border-color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertFocusBackgroundColors = (colors) => {
  // .hover-bg-dark-red:focus { background-color: #e7040f; }
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.hover-bg-${name}:focus { background-color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertFocusColors = (colors) => {
  // .hover-dark-blue:focus { color: #00449e; }
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.hover-${name}:focus { color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertHoverBackgroundColors = (colors) => {
  // .hover-bg-dark-red:hover { background-color: #e7040f; }
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.hover-bg-${name}:hover { background-color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertHoverColors = (colors) => {
  // .hover-dark-blue:hover { color: #00449e; }
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.hover-${name}:hover { color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertStripedColors = (colors) => {
  // .striped--light-silver:nth-child(odd) { background-color: #aaa; }
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.striped--${name}:nth-child(odd) { background-color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const convertTextColors = (colors) => {
  const reduceFunction = (accum, color) => {
    const name = toDashString(color.key);
    return `${accum}.${name} { color: ${color.key}; }\n`;
  };

  return R.reduce(reduceFunction, "", colors);
};

const CssTachyonsColorsGenerator = {};

CssTachyonsColorsGenerator.convert = () => {
  const colors = CssNamedColor.values();
  const backgroundColors = convertBackgroundColors(colors);
  const borderColors = convertBorderColors(colors);
  const focusBackgroundColors = convertFocusBackgroundColors(colors);
  const focusColors = convertFocusColors(colors);
  const hoverBackgroundColors = convertHoverBackgroundColors(colors);
  const hoverColors = convertHoverColors(colors);
  const stripedColors = convertStripedColors(colors);

  const textColors = convertTextColors(colors);

  const content =
    `/* Background colors */\n${backgroundColors}\n` +
    `/* Border colors */\n${borderColors}\n` +
    `/* Focus background colors */\n${focusBackgroundColors}\n` +
    `/* Focus colors */\n${focusColors}\n` +
    `/* Hover background colors */\n${hoverBackgroundColors}\n` +
    `/* Hover colors */\n${hoverColors}\n` +
    `/* Striped colors */\n${stripedColors}\n` +
    `/* Text colors */\n${textColors}`;
  FileWriter.writeFile(OUTPUT_FILE, content);
};

CssTachyonsColorsGenerator.convert();

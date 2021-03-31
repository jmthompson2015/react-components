/* eslint no-console: ["error", { allow: ["log"] }] */

import Select from "./Select.js";

const values = [
  { key: "red", label: "Red" },
  { key: "green", label: "Green" },
  { key: "blue", label: "Blue" },
  { key: "yellow", label: "Yellow" },
  { key: "cyan", label: "Cyan" },
  { key: "magenta", label: "Magenta" },
];

const onChange = (key) => {
  console.log(`onChange() key = ${key}`);
};

const element1 = React.createElement(Select, {
  id: "element1",
  initialValue: "red",
  onChange,
  values,
});
ReactDOM.render(element1, document.getElementById("panel1"));

const attributes = { size: 2 };

const element2 = React.createElement(Select, {
  attributes,
  id: "element2",
  initialValue: "red",
  onChange,
  values,
});
ReactDOM.render(element2, document.getElementById("panel2"));

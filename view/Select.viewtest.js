/* eslint no-console: ["error", { allow: ["log"] }] */

import Select from "./Select.js";

const values = [
  { key: "red", label: "Red" },
  { key: "green", label: "Green" },
  { key: "blue", label: "Blue" },
];

const onChange = (key) => {
  console.log(`onChange() key = ${key}`);
};

const element = React.createElement(Select, {
  id: "element",
  onChange,
  values,
  initialValue: "red",
});
ReactDOM.render(element, document.getElementById("panel"));

/* eslint no-console: ["error", { allow: ["log"] }] */

import Checkbox from "./Checkbox.js";

const onChange = (item, isChecked) => {
  console.log(`myOnChange() item = ${JSON.stringify(item)} isChecked ? ${isChecked}`);
};

// /////////////////////////////////////////////////////////////////////////////
// string
const element0 = React.createElement(Checkbox, {
  item: "String",
  isChecked: true,
  onChange,
});
ReactDOM.render(element0, document.getElementById("panel0"));

// /////////////////////////////////////////////////////////////////////////////
// number
const element1 = React.createElement(Checkbox, {
  item: 1,
  isChecked: false,
  onChange,
});
ReactDOM.render(element1, document.getElementById("panel1"));

// /////////////////////////////////////////////////////////////////////////////
// object
const item2 = {
  key: "red",
  label: "Red",
};

const labelFunction2 = (item) => {
  const className = `v-mid ${item.key === "red" ? " bg-red" : ""}`;

  return ReactDOMFactories.span({ className }, item.label);
};

const element2 = React.createElement(Checkbox, {
  item: item2,
  isChecked: true,
  labelFunction: labelFunction2,
  onChange,
});
ReactDOM.render(element2, document.getElementById("panel2"));

// /////////////////////////////////////////////////////////////////////////////
// array
const item3 = [1, "two", 3, "four"];

const labelFunction3 = (item) => {
  const className = "v-mid";
  const value = `[${item.join(", ")}]`;

  return ReactDOMFactories.span({ className }, value);
};

const element3 = React.createElement(Checkbox, {
  item: item3,
  isChecked: false,
  labelFunction: labelFunction3,
  onChange,
});
ReactDOM.render(element3, document.getElementById("panel3"));

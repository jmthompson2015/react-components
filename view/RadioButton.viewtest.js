/* eslint no-console: ["error", { allow: ["log"] }] */

import RadioButton from "./RadioButton.js";

const onChange = (item, isChecked) => {
  console.log(`myOnChange() item = ${JSON.stringify(item)} isChecked ? ${isChecked}`);
};

// /////////////////////////////////////////////////////////////////////////////
// string
const element0 = React.createElement(RadioButton, {
  item: "String",
  isChecked: true,
  onChange,
});
ReactDOM.render(element0, document.getElementById("panel0"));

// /////////////////////////////////////////////////////////////////////////////
// number
const element1 = React.createElement(RadioButton, {
  item: 1,
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

const element2 = React.createElement(RadioButton, {
  item: item2,
  isChecked: true,
  labelFunction: labelFunction2,
  onChange,
});
ReactDOM.render(element2, document.getElementById("panel2"));

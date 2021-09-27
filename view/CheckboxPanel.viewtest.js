/* eslint no-console: ["error", { allow: ["log"] }] */

import CheckboxPanel from "./CheckboxPanel.js";

const applyOnClick = (selectedItems) => {
  console.log(
    `applyOnClick() selectedItems = ${JSON.stringify(selectedItems)} ${typeof selectedItems}`
  );
};

// /////////////////////////////////////////////////////////////////////////////
// Strings
const items0 = ["Red", "Green", "Blue"];
const selectedItems0 = [items0[1]];

const element0 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items0,
  selectedItems: selectedItems0,
  useApplyButton: true,
});
ReactDOM.render(element0, document.getElementById("panel0"));

// /////////////////////////////////////////////////////////////////////////////
// Numbers
const items1 = [1, 2, 3];
const selectedItems1 = [items1[1]];

const element1 = React.createElement(CheckboxPanel, {
  applyOnClick,
  buttonLabel: "OK",
  items: items1,
  selectedItems: selectedItems1,
  useApplyButton: true,
});
ReactDOM.render(element1, document.getElementById("panel1"));

// /////////////////////////////////////////////////////////////////////////////
// Objects
const items2 = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "red",
    label: "Red",
  },
  {
    key: "green",
    label: "Green",
  },
  {
    key: "blue",
    label: "Blue",
  },
  {
    key: "liked",
    label: "Liked",
  },
];

const labelFunction2 = (item) => {
  const keyToClass = {
    red: "bg-red",
    green: "bg-green",
    blue: "bg-blue",
  };
  const className3 = `v-mid ${keyToClass[item.key]}`;

  return ReactDOMFactories.span({ className: className3 }, item.label);
};

const selectedItems2 = [items2[0], items2[2], items2[4]];
const element2 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items2,
  labelFunction: labelFunction2,
  selectedItems: selectedItems2,
  useApplyButton: true,
  useSelectButtons: true,
});
ReactDOM.render(element2, document.getElementById("panel2"));

// /////////////////////////////////////////////////////////////////////////////
const selectedItems3 = [items2[1], items2[3]];
const element3 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items2,
  labelFunction: labelFunction2,
  selectedItems: selectedItems3,
  useApplyButton: false,
  useSelectButtons: true,
});
ReactDOM.render(element3, document.getElementById("panel3"));

// /////////////////////////////////////////////////////////////////////////////
const selectedItems4 = [items2[0], items2[1]];
const element4 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items2,
  labelFunction: labelFunction2,
  selectedItems: selectedItems4,
  useApplyButton: false,
});
ReactDOM.render(element4, document.getElementById("panel4"));

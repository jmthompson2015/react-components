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
});
ReactDOM.render(element0, document.getElementById("panel0"));

// /////////////////////////////////////////////////////////////////////////////
// Numbers
const items1 = [1, 2, 3];
const selectedItems1 = [items1[1]];

const element1 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items1,
  selectedItems: selectedItems1,
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
  const className = `v-mid ${keyToClass[item.key]}`;

  return ReactDOMFactories.span({ className }, item.label);
};

const selectedItems2 = [items2[0], items2[2], items2[4]];
const element2 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items: items2,
  labelFunction: labelFunction2,
  selectedItems: selectedItems2,
  useSelectButtons: true,
});
ReactDOM.render(element2, document.getElementById("panel2"));

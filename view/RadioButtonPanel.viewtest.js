/* eslint no-console: ["error", { allow: ["log"] }] */

import RadioButtonPanel from "./RadioButtonPanel.js";

const applyOnClick = (selectedItem) => {
  console.log(
    `applyOnClick() selectedItem = ${JSON.stringify(selectedItem)} ${typeof selectedItem}`
  );
};

// /////////////////////////////////////////////////////////////////////////////
// Strings
const items0 = ["Red", "Green", "Blue"];
const selectedItem0 = items0[1];

const element0 = React.createElement(RadioButtonPanel, {
  applyOnClick,
  items: items0,
  selectedItem: selectedItem0,
});
ReactDOM.render(element0, document.getElementById("panel0"));

// /////////////////////////////////////////////////////////////////////////////
// Numbers
const items1 = [1, 2, 3];
const selectedItem1 = items1[1];

const element1 = React.createElement(RadioButtonPanel, {
  applyOnClick,
  items: items1,
  selectedItem: selectedItem1,
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

const selectedItem2 = items2[1];
const element2 = React.createElement(RadioButtonPanel, {
  applyOnClick,
  items: items2,
  labelFunction: labelFunction2,
  selectedItem: selectedItem2,
  useSelectButtons: true,
});
ReactDOM.render(element2, document.getElementById("panel2"));

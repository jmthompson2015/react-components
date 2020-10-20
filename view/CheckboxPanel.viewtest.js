/* eslint no-console: ["error", { allow: ["log"] }] */

import CheckboxPanel from "./CheckboxPanel.js";

const items = [
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

const myItemToChecked = {
  name: true,
  // red: false,
  green: true,
  // blue: false,
  liked: true,
};

const applyOnClick = (itemToChecked) => {
  console.log(`applyOnClick() itemToChecked = ${JSON.stringify(itemToChecked)}`);
};

const element0 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items,
  itemToChecked: myItemToChecked,
});
ReactDOM.render(element0, document.getElementById("panel0"));

const element1 = React.createElement(CheckboxPanel, {
  applyOnClick,
  items,
  itemToChecked: myItemToChecked,
  useSelectButtons: true,
});
ReactDOM.render(element1, document.getElementById("panel1"));

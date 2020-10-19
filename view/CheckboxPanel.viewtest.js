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
  red: false,
  green: true,
  blue: false,
  liked: true,
};

const applyOnClick = (itemToChecked) => {
  console.log(`applyOnClick() itemToChecked = ${JSON.stringify(itemToChecked)}`);
};

const element = React.createElement(CheckboxPanel, {
  applyOnClick,
  items,
  itemToChecked: myItemToChecked,
});
ReactDOM.render(element, document.getElementById("panel"));

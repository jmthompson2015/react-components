/* eslint no-console: ["error", { allow: ["log"] }] */

import RadioButtonPanel from "./RadioButtonPanel.js";

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

const applyOnClick = (selected) => {
  console.log(`applyOnClick() selected = ${selected}`);
};

const element = React.createElement(RadioButtonPanel, {
  applyOnClick,
  items,
  selected: "name",
});
ReactDOM.render(element, document.getElementById("panel"));

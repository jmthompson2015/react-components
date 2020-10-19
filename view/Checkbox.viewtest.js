/* eslint no-console: ["error", { allow: ["log"] }] */

import Checkbox from "./Checkbox.js";

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

const myOnChange = (itemKey, isChecked) => {
  console.log(`myOnChange() itemKey = ${itemKey} isChecked ? ${isChecked}`);
};

const element0 = React.createElement(Checkbox, {
  item: items[0], // Name
  isChecked: true,
  onChange: myOnChange,
});
ReactDOM.render(element0, document.getElementById("panel0"));

const element1 = React.createElement(Checkbox, {
  item: items[1], // Red
  isChecked: false,
  onChange: myOnChange,
});
ReactDOM.render(element1, document.getElementById("panel1"));

const element2 = React.createElement(Checkbox, {
  item: items[2], // Green
  isChecked: true,
  onChange: myOnChange,
});
ReactDOM.render(element2, document.getElementById("panel2"));

const element3 = React.createElement(Checkbox, {
  item: items[3], // Blue
  isChecked: false,
  onChange: myOnChange,
});
ReactDOM.render(element3, document.getElementById("panel3"));

const element4 = React.createElement(Checkbox, {
  item: items[4], // Liked
  isChecked: true,
  onChange: myOnChange,
});
ReactDOM.render(element4, document.getElementById("panel4"));

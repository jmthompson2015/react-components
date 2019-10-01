/* eslint no-console: ["error", { allow: ["log"] }] */

import OptionPane from "./OptionPane.js";

const message = ReactDOMFactories.div({}, `Select an Action`);

const cancel = () => {
  console.log(`cancel()`);
};
const ok = () => {
  console.log(`ok()`);
};

const cancelButton = ReactDOMFactories.button(
  {
    key: "cancelButton",
    onClick: cancel
  },
  "Cancel"
);
const okButton = ReactDOMFactories.button(
  {
    key: "okButton",
    onClick: ok
  },
  "OK"
);
const buttons = ReactDOMFactories.span({}, cancelButton, " ", okButton);

const element = React.createElement(OptionPane, {
  buttons,
  message,
  title: "Test Option Pane"
});

ReactDOM.render(element, document.getElementById("panel"));

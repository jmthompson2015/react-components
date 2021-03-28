/* eslint no-console: ["error", { allow: ["log"] }] */

import StringInput from "./StringInput.js";

const onBlur = (value) => {
  console.log(`onBlur() value = ${value}`);
};

const element = React.createElement(StringInput, {
  id: "boardGameRankmaxValue",
  onBlur,
  className: "filterField",
  initialValue: "five",
});
ReactDOM.render(element, document.getElementById("panel"));

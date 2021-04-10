import CollapsiblePane from "./CollapsiblePane.js";

const element = ReactDOMFactories.span({}, "Decorated Element");
const titledElement = React.createElement(CollapsiblePane, {
  title: "My Title",
  element,
  isExpanded: true,
});

ReactDOM.render(titledElement, document.getElementById("panel"));

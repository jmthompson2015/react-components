import CollapsiblePane from "./CollapsiblePane.js";

const element = ReactDOMFactories.span({}, "Decorated Element");
const titledElement = React.createElement(CollapsiblePane, { header: "My Header", element });

ReactDOM.render(titledElement, document.getElementById("panel"));

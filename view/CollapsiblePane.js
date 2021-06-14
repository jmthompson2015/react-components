import RU from "./ReactUtilities.js";

class CollapsiblePane extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { isExpanded: props.isExpanded };

    this.toggleExpand = this.toggleExpandFunction.bind(this);
  }

  createElementCell() {
    const { element, elementClass } = this.props;
    const { isExpanded } = this.state;
    const className = isExpanded ? "dtc pa1 v-mid" : "dn";

    return ReactDOMFactories.div(
      { key: "elementCell", className: `${elementClass} ${className}` },
      element
    );
  }

  createTitleCell() {
    const { title, titleClass } = this.props;
    const { isExpanded } = this.state;
    const titleCell = RU.createCell(title, "titleCell", "v-mid");
    const expandLabel = isExpanded ? "\u25BC" : "\u25B6";
    const expandControl = RU.createCell(expandLabel, "expandCell", "dtc pr1 v-mid", {
      onClick: this.toggleExpand,
    });
    const span = RU.createSpan([expandControl, titleCell], "titleExpandTable");

    return RU.createCell(span, "titleCell", titleClass);
  }

  toggleExpandFunction() {
    const { isExpanded: oldIsExpanded } = this.state;

    this.setState({ isExpanded: !oldIsExpanded });
  }

  render() {
    const { className } = this.props;

    const titleCell = this.createTitleCell();
    const elementCell = this.createElementCell();

    const rows = [RU.createRow(titleCell, "titleRow"), RU.createRow(elementCell, "elementRow")];

    return RU.createTable(rows, "collapsiblePaneTable", className);
  }
}

CollapsiblePane.propTypes = {
  element: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,

  className: PropTypes.string,
  elementClass: PropTypes.string,
  isExpanded: PropTypes.bool,
  titleClass: PropTypes.string,
};

CollapsiblePane.defaultProps = {
  className: "bg-light-gray ma1",
  elementClass: "ma0 tc v-mid",
  isExpanded: false,
  titleClass: "b f5 ph1 pt1 tl",
};

export default CollapsiblePane;

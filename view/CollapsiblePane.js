import RU from "./ReactUtilities.js";

class CollapsiblePane extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isExpanded: props.isExpanded };

    this.toggleExpand = this.toggleExpandFunction.bind(this);
  }

  createElementCell() {
    const { element } = this.props;
    const { isExpanded } = this.state;
    const className = isExpanded ? "dtc pa1 v-mid" : "dn";

    return ReactDOMFactories.div({ key: "elementCell", className }, element);
  }

  createHeaderCell() {
    const { header, headerClass } = this.props;
    const { isExpanded } = this.state;
    const headerCell = RU.createCell(header, "headerCell", "v-mid");
    const expandLabel = isExpanded ? "\u25B6" : "\u25BC";
    const expandControl = ReactDOMFactories.div(
      { key: "expandCell", className: "dtc fr v-mid", onClick: this.toggleExpand },
      expandLabel
    );
    const row = RU.createRow([headerCell, expandControl], "headerExpandRow");
    const table = RU.createTable(row, "headerExpandTable", `${headerClass} w-100`);

    return RU.createCell(table, "headerCell");
  }

  toggleExpandFunction() {
    const { isExpanded: oldIsExpanded } = this.state;

    this.setState({ isExpanded: !oldIsExpanded });
  }

  render() {
    const { className } = this.props;

    const headerCell = this.createHeaderCell();
    const elementCell = this.createElementCell();

    const rows = [RU.createRow(headerCell, "headerRow"), RU.createRow(elementCell, "elementRow")];

    return RU.createTable(rows, "collapsiblePaneTable", className);
  }
}

CollapsiblePane.propTypes = {
  element: PropTypes.shape().isRequired,

  className: PropTypes.string,
  header: PropTypes.string,
  headerClass: PropTypes.string,
  isExpanded: PropTypes.bool,
};

CollapsiblePane.defaultProps = {
  className: "bg-light-gray ma1",
  header: undefined,
  headerClass: "b f5 ph1 pt1 tl",
  isExpanded: true,
};

export default CollapsiblePane;

import RU from "./ReactUtilities.js";

class TitledElement extends React.PureComponent {
  createTitleCell() {
    const { title, titleClass } = this.props;

    return RU.createCell(title, "titleCell", titleClass);
  }

  createElementCell() {
    const { element, elementClass } = this.props;

    return RU.createCell(element, "elementCell", elementClass);
  }

  render() {
    const { className } = this.props;

    const titleCell = this.createTitleCell();
    const elementCell = this.createElementCell();

    const rows = [RU.createRow(titleCell, "titleRow"), RU.createRow(elementCell, "elementRow")];

    return RU.createTable(rows, "titledElementTable", className);
  }
}

TitledElement.propTypes = {
  element: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,

  className: PropTypes.string,
  elementClass: PropTypes.string,
  titleClass: PropTypes.string,
};

TitledElement.defaultProps = {
  className: "bg-light-gray ma1",
  elementClass: "ma0 tc v-mid",
  titleClass: "b f5 ph1 pt1 tc",
};

export default TitledElement;

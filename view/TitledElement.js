import RU from "./ReactUtilities.js";

class TitledElement extends React.Component {
  render() {
    const { className, element, title, titleClass } = this.props;

    const titleCell = RU.createCell(title, "titleCell", titleClass);
    const elementCell = RU.createCell(element, "elementCell");

    const rows = [RU.createRow(titleCell, "titleRow"), RU.createRow(elementCell, "elementRow")];

    return RU.createTable(rows, "titledElementTable", className);
  }
}

TitledElement.propTypes = {
  element: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,

  className: PropTypes.string,
  titleClass: PropTypes.string
};

TitledElement.defaultProps = {
  className: "bg-light-gray ma1",
  titleClass: "b f5 ph1 pt1 tc"
};

export default TitledElement;

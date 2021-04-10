import RadioButton from "./RadioButton.js";
import RU from "./ReactUtilities.js";

const defaultKeyFunction = (item) => (typeof item === "object" ? JSON.stringify(item) : item);

class RadioButtonPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { selectedItem } = this.props;
    this.state = { selectedItem };
    this.handleApply = this.handleApplyFunction.bind(this);
    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleApplyFunction() {
    const { applyOnClick } = this.props;
    const { selectedItem } = this.state;

    applyOnClick(selectedItem);
  }

  handleChangeFunction(item) {
    this.setState({ selectedItem: item });
  }

  createButtonTable() {
    const applyButton = RU.createButton("Apply", "applyButton", undefined, {
      onClick: this.handleApply,
    });
    const applyCell = RU.createCell(applyButton, "applyCell");
    const cells = applyCell;

    const row = RU.createRow(cells, "buttonRow");

    return RU.createTable(row, "buttonTable", "button-table");
  }

  render() {
    const { className, items, keyFunction, labelFunction } = this.props;
    const { selectedItem } = this.state;

    const mapFunction = (item) => {
      const isChecked = selectedItem === item;
      const radioButton = React.createElement(RadioButton, {
        item,
        isChecked,
        labelFunction,
        onChange: this.handleChange,
      });
      const cell = RU.createCell(radioButton);
      return RU.createRow(cell, keyFunction(item));
    };
    const radioButtons = items.map(mapFunction);
    const table = RU.createTable(radioButtons, "radioButtonTable", "radio-button-table");
    const scrollPane = ReactDOMFactories.div({ className: "scroll-pane" }, table);

    const cell0 = RU.createCell(scrollPane, "radioButtonCell", "radio-button-cell");
    const cell1 = RU.createCell(this.createButtonTable(), "buttonCell", "button-cell");

    const rows = [
      RU.createRow(cell0, "radioButtonRow", "radio-button-row"),
      RU.createRow(cell1, "buttonRow", "button-row"),
    ];

    return RU.createTable(rows, "radioButtonPanel", className);
  }
}

RadioButtonPanel.propTypes = {
  applyOnClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
  ).isRequired,

  className: PropTypes.string,
  keyFunction: PropTypes.func,
  labelFunction: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

RadioButtonPanel.defaultProps = {
  className: undefined,
  keyFunction: defaultKeyFunction,
  labelFunction: undefined,
  selectedItem: undefined,
};

export default RadioButtonPanel;

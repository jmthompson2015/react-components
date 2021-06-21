import RadioButton from "./RadioButton.js";
import RU from "./ReactUtilities.js";

const defaultKeyFunction = (item) => (typeof item === "object" ? JSON.stringify(item) : item);

class RadioButtonPanel extends React.Component {
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
    const { buttonLabel } = this.props;
    const applyButton = RU.createButton(buttonLabel, "applyButton", undefined, {
      onClick: this.handleApply,
    });
    const applyCell = RU.createCell(applyButton, "applyCell");
    const cells = applyCell;

    const row = RU.createRow(cells, "buttonRow");

    return RU.createTable(row, "buttonTable", "button-table");
  }

  render() {
    const {
      buttonPanelClass,
      className,
      customKey,
      inputPanelClass,
      items,
      keyFunction,
      labelFunction,
    } = this.props;
    const { selectedItem } = this.state;

    const mapFunction = (item) => {
      const isChecked = selectedItem === item;
      const input = React.createElement(RadioButton, {
        item,
        isChecked,
        labelFunction,
        onChange: this.handleChange,
      });
      const cell = RU.createCell(input);
      return RU.createRow(cell, keyFunction(item));
    };
    const inputs = items.map(mapFunction);
    const table = RU.createTable(inputs, "inputsTable", "inputs-table");
    const scrollPane = ReactDOMFactories.div({ className: "scroll-pane" }, table);

    const cell0 = RU.createCell(scrollPane, "inputsCell", inputPanelClass);
    const cell1 = RU.createCell(this.createButtonTable(), "buttonPanelCell", buttonPanelClass);

    const rows = [
      RU.createRow(cell0, "inputRow", "input-row"),
      RU.createRow(cell1, "buttonRow", "button-row"),
    ];

    return RU.createTable(rows, customKey, className);
  }
}

RadioButtonPanel.propTypes = {
  applyOnClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
  ).isRequired,

  buttonLabel: PropTypes.string,
  buttonPanelClass: PropTypes.string,
  className: PropTypes.string,
  customKey: PropTypes.string,
  inputPanelClass: PropTypes.string,
  keyFunction: PropTypes.func,
  labelFunction: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

RadioButtonPanel.defaultProps = {
  buttonLabel: "Apply",
  buttonPanelClass: "fr pt1",
  className: undefined,
  customKey: "RadioButtonPanel",
  inputPanelClass: "bg-white tl",
  keyFunction: defaultKeyFunction,
  labelFunction: undefined,
  selectedItem: undefined,
};

export default RadioButtonPanel;

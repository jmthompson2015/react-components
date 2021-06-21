import Checkbox from "./Checkbox.js";
import RU from "./ReactUtilities.js";

const defaultKeyFunction = (item) => (typeof item === "object" ? JSON.stringify(item) : item);

class CheckboxPanel extends React.Component {
  constructor(props) {
    super(props);

    const { selectedItems } = this.props;
    this.state = { selectedItems };
    this.handleApply = this.handleApplyFunction.bind(this);
    this.handleChange = this.handleChangeFunction.bind(this);
    this.handleSelectAll = this.handleSelectAllFunction.bind(this);
    this.handleSelectNone = this.handleSelectNoneFunction.bind(this);
  }

  handleApplyFunction() {
    const { applyOnClick } = this.props;
    const { selectedItems } = this.state;

    applyOnClick(selectedItems);
  }

  handleChangeFunction(item, isChecked) {
    const { selectedItems } = this.state;
    let newSelectedItems;

    if (isChecked) {
      newSelectedItems = [...selectedItems, item];
    } else {
      newSelectedItems = selectedItems.filter((item2) => item2 !== item);
    }

    this.setState({ selectedItems: newSelectedItems });
  }

  handleSelectAllFunction() {
    const { items } = this.props;

    this.setState({ selectedItems: items });
  }

  handleSelectNoneFunction() {
    this.setState({ selectedItems: [] });
  }

  createButtonTable() {
    const { buttonLabel, useSelectButtons } = this.props;
    const applyButton = RU.createButton(buttonLabel, "applyButton", undefined, {
      onClick: this.handleApply,
    });
    const applyCell = RU.createCell(applyButton, "applyCell");
    let cells = applyCell;

    if (useSelectButtons) {
      const selectAllButton = RU.createButton("Select All", "selectAllButton", undefined, {
        onClick: this.handleSelectAll,
      });
      const selectNoneButton = RU.createButton("Select None", "selectNoneButton", undefined, {
        onClick: this.handleSelectNone,
      });
      const cell0 = RU.createCell(selectAllButton, "selectAllCell");
      const cell1 = RU.createCell(selectNoneButton, "selectNoneCell");
      cells = [cell0, cell1, applyCell];
    }

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
    const { selectedItems } = this.state;

    const mapFunction = (item) => {
      const isChecked = selectedItems.includes(item);
      const input = React.createElement(Checkbox, {
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

CheckboxPanel.propTypes = {
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
  selectedItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
  ),
  useSelectButtons: PropTypes.bool,
};

CheckboxPanel.defaultProps = {
  buttonLabel: "Apply",
  buttonPanelClass: "fr pt1",
  className: undefined,
  customKey: "CheckboxPanel",
  inputPanelClass: "bg-white tl",
  keyFunction: defaultKeyFunction,
  labelFunction: undefined,
  selectedItems: [],
  useSelectButtons: false,
};

export default CheckboxPanel;

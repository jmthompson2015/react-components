import Checkbox from "./Checkbox.js";
import RU from "./ReactUtilities.js";

class CheckboxPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { itemToChecked } = this.props;
    this.state = { itemToChecked };
    this.handleApply = this.handleApplyFunction.bind(this);
    this.handleChange = this.handleChangeFunction.bind(this);
    this.handleSelectAll = this.handleSelectAllFunction.bind(this);
    this.handleSelectNone = this.handleSelectNoneFunction.bind(this);
  }

  createButtonTable() {
    const { useSelectButtons } = this.props;
    const applyButton = RU.createButton("Apply", "applyButton", undefined, {
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

  handleApplyFunction() {
    const { applyOnClick } = this.props;
    const { itemToChecked } = this.state;

    applyOnClick(itemToChecked);
  }

  handleChangeFunction(itemKey, isChecked) {
    const { itemToChecked } = this.state;
    const newItemToChecked = { ...itemToChecked, [itemKey]: isChecked };

    this.setState({ itemToChecked: newItemToChecked });
  }

  handleSelectAllFunction() {
    const { items } = this.props;
    const reduceFunction = (accum, item) => ({ ...accum, [item.key]: true });
    const newItemToChecked = items.reduce(reduceFunction, {});

    this.setState({ itemToChecked: newItemToChecked });
  }

  handleSelectNoneFunction() {
    this.setState({ itemToChecked: {} });
  }

  render() {
    const { items } = this.props;
    const { itemToChecked } = this.state;

    const mapFunction = (item) => {
      const isChecked = itemToChecked[item.key];
      const checkbox = React.createElement(Checkbox, {
        item,
        isChecked,
        onChange: this.handleChange,
      });
      const cell = RU.createCell(checkbox);
      return RU.createRow(cell, item.key);
    };
    const checkboxes = items.map(mapFunction);
    const table = RU.createTable(checkboxes, "checkboxesTable", "checkboxes-table");
    const scrollPane = ReactDOMFactories.div({ className: "scroll-pane" }, table);

    const cell0 = RU.createCell(scrollPane, "checkboxesCell", "checkboxes-cell");
    const cell1 = RU.createCell(this.createButtonTable(), "buttonCell", "button-cell");

    const rows = [
      RU.createRow(cell0, "checkboxRow", "checkbox-row"),
      RU.createRow(cell1, "buttonRow", "button-row"),
    ];

    return RU.createTable(rows, "checkboxPanel", "checkbox-panel");
  }
}

CheckboxPanel.propTypes = {
  applyOnClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemToChecked: PropTypes.shape().isRequired,

  useSelectButtons: PropTypes.bool,
};

CheckboxPanel.defaultProps = {
  useSelectButtons: false,
};

export default CheckboxPanel;

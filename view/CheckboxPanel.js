import Checkbox from "./Checkbox.js";
import RU from "./ReactUtilities.js";

class CheckboxPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { itemToChecked } = this.props;
    this.state = { itemToChecked };
    this.handleApply = this.handleApplyFunction.bind(this);
    this.handleChange = this.handleChangeFunction.bind(this);
  }

  createButtonTable() {
    const applyButton = RU.createButton("Apply", null, null, { onClick: this.handleApply });
    const cell = RU.createCell(applyButton, "applyButton", "button");
    const row = RU.createRow(cell, "button-row");

    return RU.createTable(row, "buttonTable", "buttons");
  }

  handleApplyFunction() {
    const { applyOnClick } = this.props;
    const { itemToChecked } = this.state;

    applyOnClick(itemToChecked);
  }

  handleChangeFunction(itemKey, isChecked) {
    const { itemToChecked } = this.state;
    const newitemToChecked = { ...itemToChecked, [itemKey]: isChecked };

    this.setState({ itemToChecked: newitemToChecked });
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

    const cell0 = RU.createTable(checkboxes, "checkboxTable", "checkbox-panel");
    const cell1 = RU.createCell(this.createButtonTable(), "buttonTable", "button-panel");

    const rows = [RU.createRow(cell0, "checkboxTableRow"), RU.createRow(cell1, "buttonRow")];

    return RU.createTable(rows, "checkboxTable");
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
};

export default CheckboxPanel;

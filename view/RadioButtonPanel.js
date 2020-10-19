import RadioButton from "./RadioButton.js";
import RU from "./ReactUtilities.js";

class RadioButtonPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { selected } = this.props;
    this.state = { selected };
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
    const { selected } = this.state;

    applyOnClick(selected);
  }

  handleChangeFunction(itemKey) {
    this.setState({ selected: itemKey });
  }

  render() {
    const { items } = this.props;
    const { selected } = this.state;

    const mapFunction = (item) => {
      const isChecked = item.key === selected;
      const radioButton = React.createElement(RadioButton, {
        item,
        isChecked,
        onChange: this.handleChange,
      });
      const cell = RU.createCell(radioButton);
      return RU.createRow(cell, item.key);
    };
    const radioButtons = items.map(mapFunction);

    const cell0 = RU.createTable(radioButtons, "radioButtonTable", "radio-button-panel");
    const cell1 = RU.createCell(this.createButtonTable(), "buttonTable", "button-panel");

    const rows = [RU.createRow(cell0, "radioButtonTableRow"), RU.createRow(cell1, "buttonRow")];

    return RU.createTable(rows, "radioButtonTable");
  }
}

RadioButtonPanel.propTypes = {
  applyOnClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
};

export default RadioButtonPanel;

import RadioButton from "./RadioButton.js";
import RU from "./ReactUtilities.js";

class RadioButtonPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { selected } = this.props;
    this.state = { selected };
    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(itemKey) {
    this.setState({ selected: itemKey });

    const { applyOnClick } = this.props;
    applyOnClick(itemKey);
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

    return RU.createTable(radioButtons, "radioButtonTable", "radio-button-table");
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

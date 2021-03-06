class RadioButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const { item, onChange } = this.props;
    const { checked } = event.target;

    onChange(item, checked);
  }

  render() {
    const { item, isChecked, labelFunction } = this.props;

    const input = ReactDOMFactories.input({
      key: `${item.key}${isChecked}`,
      className: "mr1 v-mid",
      type: "radio",
      checked: isChecked,
      onChange: this.handleChange,
    });
    const labelElement = labelFunction(item);

    return ReactDOMFactories.label({ className: "db v-mid" }, input, labelElement);
  }
}

RadioButton.propTypes = {
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]).isRequired,
  onChange: PropTypes.func.isRequired,

  isChecked: PropTypes.bool,
  labelFunction: PropTypes.func,
};

RadioButton.defaultProps = {
  isChecked: false,
  labelFunction: (item) => ReactDOMFactories.span({ className: "v-mid" }, item),
};

export default RadioButton;

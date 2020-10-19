class RadioButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const { item, onChange } = this.props;
    const { checked } = event.target;

    onChange(item.key, checked);
  }

  render() {
    const { item, isChecked } = this.props;

    const input = ReactDOMFactories.input({
      key: `${item.key}${isChecked}`,
      type: "radio",
      checked: isChecked,
      onChange: this.handleChange,
      style: { verticalAlign: "middle" },
    });
    const labelElement = ReactDOMFactories.span({ style: { verticalAlign: "middle" } }, item.label);

    return ReactDOMFactories.label(
      { style: { display: "block", verticalAlign: "middle" } },
      input,
      labelElement
    );
  }
}

RadioButton.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,

  isChecked: PropTypes.bool,
};

RadioButton.defaultProps = {
  isChecked: false,
};

export default RadioButton;

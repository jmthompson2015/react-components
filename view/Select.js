const createOption = (key, label) => ReactDOMFactories.option({ key, value: key }, label);

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction() {
    const { id, onChange } = this.props;
    const valueSelect = document.getElementById(id);
    const selected = valueSelect.options[valueSelect.selectedIndex].value;
    onChange(selected);
  }

  render() {
    const { attributes, id, initialValue, values } = this.props;
    const myAttributes = R.pipe(
      R.assoc("id", id),
      R.assoc("defaultValue", initialValue),
      R.assoc("onChange", this.handleChange)
    )(attributes);
    const options = R.map((value) => createOption(value.key, value.label), values);

    return ReactDOMFactories.select(myAttributes, options);
  }
}

Select.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,

  attributes: PropTypes.shape(),
  id: PropTypes.string,
  initialValue: PropTypes.string,
};

Select.defaultProps = {
  attributes: {},
  id: "select",
  initialValue: undefined,
};

export default Select;

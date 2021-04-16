class ColorSwatch extends React.PureComponent {
  render() {
    const { className, color, title } = this.props;
    const backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    const key = `colorSwatch-${color.r},${color.g},${color.b}`;

    return ReactDOMFactories.div({ key, className, style: { backgroundColor }, title });
  }
}

ColorSwatch.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,

  className: PropTypes.string,
  title: PropTypes.string,
};

ColorSwatch.defaultProps = {
  className: "h-100 w-100",
  title: undefined,
};

export default ColorSwatch;

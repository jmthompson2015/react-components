/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */
class OptionPane extends React.Component {
  constructor(props) {
    super(props);

    const { initialInput } = this.props;

    this.state = { input: initialInput };
  }

  createButtonsCell() {
    const { buttons, buttonsClass } = this.props;

    return ReactDOMFactories.td({ colSpan: 2, className: buttonsClass }, buttons);
  }

  createInputCell() {
    const { inputClass } = this.props;
    const { input } = this.state;

    return ReactDOMFactories.td({ className: inputClass }, input);
  }

  createMessageCells() {
    const { icon, message, messageClass } = this.props;

    const cell10 = ReactDOMFactories.td({ key: 0, rowSpan: 2 }, icon);
    const cell11 = ReactDOMFactories.td({ key: 1, className: messageClass }, message);

    return [cell10, cell11];
  }

  createTitleCell() {
    const { title, titleClass } = this.props;

    return ReactDOMFactories.td({ colSpan: 2, className: titleClass }, title);
  }

  render() {
    const { className } = this.props;

    const cell0 = this.createTitleCell();
    const cells1 = this.createMessageCells();
    const cell2 = this.createInputCell();
    const cell3 = this.createButtonsCell();

    const rows = [
      ReactDOMFactories.tr({ key: "row0" }, cell0),
      ReactDOMFactories.tr({ key: "row1" }, cells1),
      ReactDOMFactories.tr({ key: "row2" }, cell2),
      ReactDOMFactories.tr({ key: "row3" }, cell3),
    ];
    const tbody = ReactDOMFactories.tbody({}, rows);

    return ReactDOMFactories.table({ className }, tbody);
  }
}

OptionPane.propTypes = {
  buttons: PropTypes.shape().isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  title: PropTypes.string.isRequired,

  buttonsClass: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.shape(),
  initialInput: PropTypes.shape(),
  inputClass: PropTypes.string,
  messageClass: PropTypes.string,
  titleClass: PropTypes.string,
};

OptionPane.defaultProps = {
  buttonsClass: "pa2 tr",
  className: "ba bg-white center v-top",
  icon: undefined,
  initialInput: undefined,
  inputClass: undefined,
  messageClass: undefined,
  titleClass: "b bg-light-gray f4 tc",
};

export default OptionPane;

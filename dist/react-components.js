(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactComponent = factory());
}(this, (function () { 'use strict';

  class Checkbox extends React.PureComponent {
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
        className: "v-mid",
        type: "checkbox",
        checked: isChecked,
        onChange: this.handleChange,
      });
      const labelElement = labelFunction(item);

      return ReactDOMFactories.label({ className: "db v-mid" }, input, labelElement);
    }
  }

  Checkbox.propTypes = {
    item: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape(),
      PropTypes.arrayOf(),
    ]).isRequired,
    onChange: PropTypes.func.isRequired,

    isChecked: PropTypes.bool,
    labelFunction: PropTypes.func,
  };

  Checkbox.defaultProps = {
    isChecked: false,
    labelFunction: (item) => ReactDOMFactories.span({ className: "v-mid" }, item),
  };

  const ReactUtilities = {};

  const merge = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
  };

  ReactUtilities.createButton = (element, key, className, props = {}) => {
    const obj2 = { key, className };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.button(newProps, element);
  };

  ReactUtilities.createCell = (element, key, className, props = {}) => {
    const obj2 = { key, className: `dtc${className ? ` ${className}` : ""}` };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.div(newProps, element);
  };

  ReactUtilities.createFlexbox = (cells, key, className, props = {}) => {
    const obj2 = { key, className: `flex${className ? ` ${className}` : ""}` };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createFlexboxWrap = (cells, key, className, props = {}) => {
    const obj2 = {
      key,
      className: `flex flex-wrap${className ? ` ${className}` : ""}`
    };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createImg = (src, key, className, props = {}) => {
    const obj2 = { src, key, className };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.img(newProps);
  };

  ReactUtilities.createRow = (cells, key, className, props = {}) => {
    const obj2 = { key, className: `dt-row${className ? ` ${className}` : ""}` };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createSpan = (element, key, className, props = {}) => {
    const obj2 = { key, className };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.span(newProps, element);
  };

  ReactUtilities.createTable = (rows, key, className, props = {}) => {
    const obj2 = { key, className: `dt${className ? ` ${className}` : ""}` };
    const newProps = merge(props, obj2);

    return ReactDOMFactories.div(newProps, rows);
  };

  const defaultKeyFunction = (item) => {
    return typeof item === "object" ? JSON.stringify(item) : item;
  };

  class CheckboxPanel extends React.PureComponent {
    constructor(props) {
      super(props);

      const { selectedItems } = this.props;
      this.state = { selectedItems };
      this.handleApply = this.handleApplyFunction.bind(this);
      this.handleChange = this.handleChangeFunction.bind(this);
      this.handleSelectAll = this.handleSelectAllFunction.bind(this);
      this.handleSelectNone = this.handleSelectNoneFunction.bind(this);
    }

    createButtonTable() {
      const { useSelectButtons } = this.props;
      const applyButton = ReactUtilities.createButton("Apply", "applyButton", undefined, {
        onClick: this.handleApply,
      });
      const applyCell = ReactUtilities.createCell(applyButton, "applyCell");
      let cells = applyCell;

      if (useSelectButtons) {
        const selectAllButton = ReactUtilities.createButton("Select All", "selectAllButton", undefined, {
          onClick: this.handleSelectAll,
        });
        const selectNoneButton = ReactUtilities.createButton("Select None", "selectNoneButton", undefined, {
          onClick: this.handleSelectNone,
        });
        const cell0 = ReactUtilities.createCell(selectAllButton, "selectAllCell");
        const cell1 = ReactUtilities.createCell(selectNoneButton, "selectNoneCell");
        cells = [cell0, cell1, applyCell];
      }

      const row = ReactUtilities.createRow(cells, "buttonRow");

      return ReactUtilities.createTable(row, "buttonTable", "button-table");
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

    render() {
      const { items, keyFunction, labelFunction } = this.props;
      const { selectedItems } = this.state;

      const mapFunction = (item) => {
        const isChecked = selectedItems.includes(item);
        const checkbox = React.createElement(Checkbox, {
          item,
          isChecked,
          labelFunction,
          onChange: this.handleChange,
        });
        const cell = ReactUtilities.createCell(checkbox);
        return ReactUtilities.createRow(cell, keyFunction(item));
      };
      const checkboxes = items.map(mapFunction);
      const table = ReactUtilities.createTable(checkboxes, "checkboxesTable", "checkboxes-table");
      const scrollPane = ReactDOMFactories.div({ className: "scroll-pane" }, table);

      const cell0 = ReactUtilities.createCell(scrollPane, "checkboxesCell", "checkboxes-cell");
      const cell1 = ReactUtilities.createCell(this.createButtonTable(), "buttonCell", "button-cell");

      const rows = [
        ReactUtilities.createRow(cell0, "checkboxRow", "checkbox-row"),
        ReactUtilities.createRow(cell1, "buttonRow", "button-row"),
      ];

      return ReactUtilities.createTable(rows, "checkboxPanel", "checkbox-panel");
    }
  }

  CheckboxPanel.propTypes = {
    applyOnClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf().isRequired,

    keyFunction: PropTypes.func,
    labelFunction: PropTypes.func,
    selectedItems: PropTypes.arrayOf(),
    useSelectButtons: PropTypes.bool,
  };

  CheckboxPanel.defaultProps = {
    keyFunction: defaultKeyFunction,
    labelFunction: undefined,
    selectedItems: [],
    useSelectButtons: false,
  };

  class CollapsiblePane extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isExpanded: props.isExpanded };

      this.toggleExpand = this.toggleExpandFunction.bind(this);
    }

    createElementCell() {
      const { element } = this.props;
      const { isExpanded } = this.state;
      const className = isExpanded ? "dtc pa1 v-mid" : "dn";

      return ReactDOMFactories.div({ key: "elementCell", className }, element);
    }

    createHeaderCell() {
      const { header, headerClass } = this.props;
      const { isExpanded } = this.state;
      const headerCell = ReactUtilities.createCell(header, "headerCell", headerClass);
      const expandLabel = isExpanded ? "\u25B6" : "\u25BC";
      const expandControl = ReactDOMFactories.div(
        { key: "expandCell", onClick: this.toggleExpand },
        expandLabel
      );
      const row = ReactUtilities.createRow([headerCell, expandControl], "headerExpandRow");
      const table = ReactUtilities.createTable(row, "headerExpandTable", "w-100");

      return ReactUtilities.createCell(table, "headerCell");
    }

    toggleExpandFunction() {
      const { isExpanded: oldIsExpanded } = this.state;

      this.setState({ isExpanded: !oldIsExpanded });
    }

    render() {
      const { className } = this.props;

      const headerCell = this.createHeaderCell();
      const elementCell = this.createElementCell();

      const rows = [ReactUtilities.createRow(headerCell, "headerRow"), ReactUtilities.createRow(elementCell, "elementRow")];

      return ReactUtilities.createTable(rows, "collapsiblePaneTable", className);
    }
  }

  CollapsiblePane.propTypes = {
    element: PropTypes.shape().isRequired,

    className: PropTypes.string,
    header: PropTypes.string,
    headerClass: PropTypes.string,
    isExpanded: PropTypes.bool
  };

  CollapsiblePane.defaultProps = {
    className: "bg-light-gray ma1",
    header: undefined,
    headerClass: "b f5 ph1 pt1 tc",
    isExpanded: true
  };

  /* eslint no-console: ["error", { allow: ["log"] }] */

  const loadImage = (src, isVerbose) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => {
        if (isVerbose) {
          console.log(`Loaded image: ${src} ${img.width}x${img.height}`);
        }
        resolve(img);
      });
      img.addEventListener("error", err => reject(err));
      img.src = src;
    });

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  class LayeredCanvas extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        imageMap: {}
      };

      this.handleOnClick = this.handleOnClickFunction.bind(this);
    }

    componentDidMount() {
      this.loadImages();
      this.paint();
    }

    componentDidUpdate() {
      this.paint();
    }

    handleOnClickFunction(event) {
      const { onClick } = this.props;

      onClick(event);
    }

    loadImages() {
      const { images, isVerbose } = this.props;

      for (let i = 0; i < images.length; i += 1) {
        loadImage(images[i], isVerbose).then(img => {
          const { imageMap: oldImageMap } = this.state;
          const newImageMap = { ...oldImageMap };
          newImageMap[images[i]] = img;
          this.setState({ imageMap: newImageMap });
        });
      }
    }

    paint() {
      const { drawLayerFunctions, height, customKey, width } = this.props;
      const { imageMap } = this.state;

      const canvas = document.getElementById(customKey);
      const context = canvas.getContext("2d");

      const eachFunction = drawFunction => {
        drawFunction(context, width, height, imageMap);
      };

      drawLayerFunctions.forEach(eachFunction);
    }

    render() {
      const { backgroundColor, clientProps, customKey, height, title, width } = this.props;

      const myProps = {
        id: customKey,
        key: customKey,
        height,
        onClick: this.handleOnClick,
        style: { backgroundColor },
        title,
        width
      };
      const inputProps = { ...myProps, ...clientProps };

      return ReactDOMFactories.canvas(inputProps);
    }
  }

  LayeredCanvas.propTypes = {
    drawLayerFunctions: PropTypes.arrayOf(PropTypes.func).isRequired,

    backgroundColor: PropTypes.string,
    clientProps: PropTypes.shape(),
    customKey: PropTypes.string,
    height: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    isVerbose: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    width: PropTypes.number
  };

  LayeredCanvas.defaultProps = {
    backgroundColor: undefined,
    clientProps: {},
    customKey: "hexBoardCanvas",
    height: 480,
    images: [],
    isVerbose: false,
    onClick: () => {},
    title: undefined,
    width: 640
  };

  class NumberInput extends React.PureComponent {
    constructor(props) {
      super(props);

      const { initialValue } = this.props;
      this.state = { value: initialValue };

      this.handleBlur = this.handleBlurFunction.bind(this);
      this.handleChange = this.handleChangeFunction.bind(this);
    }

    handleBlurFunction() {
      const { onBlur } = this.props;
      const { value } = this.state;
      const myValue = Number(value);

      onBlur(myValue);
    }

    handleChangeFunction(event) {
      const { value } = event.target;
      const myValue = Number(value);

      this.setState({ value: myValue });
    }

    render() {
      const { className, id, initialValue, max, min, step } = this.props;

      return ReactDOMFactories.input({
        id,
        type: "number",
        className,
        defaultValue: initialValue,
        max,
        min,
        step,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
      });
    }
  }

  NumberInput.propTypes = {
    onBlur: PropTypes.func.isRequired,

    id: PropTypes.string,
    className: PropTypes.string,
    initialValue: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
  };

  NumberInput.defaultProps = {
    id: "numberInput",
    className: undefined,
    initialValue: 0,
    max: undefined,
    min: undefined,
    step: undefined,
  };

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

    render() {
      const {
        buttons,
        buttonsClass,
        icon,
        message,
        messageClass,
        panelClass,
        title,
        titleClass
      } = this.props;
      const rows = [];

      const cell0 = ReactDOMFactories.td({ colSpan: 2, className: titleClass }, title);
      rows.push(ReactDOMFactories.tr({ key: 0 }, cell0));

      const cell10 = ReactDOMFactories.td({ key: 0, rowSpan: 2 }, icon);
      const cell11 = ReactDOMFactories.td({ key: 1, className: messageClass }, message);
      rows.push(ReactDOMFactories.tr({ key: 1 }, [cell10, cell11]));

      const { input } = this.state;
      const cell2 = ReactDOMFactories.td({}, input);
      rows.push(ReactDOMFactories.tr({ key: 2 }, cell2));

      const cell3 = ReactDOMFactories.td({ colSpan: 2, className: buttonsClass }, buttons);
      rows.push(ReactDOMFactories.tr({ key: 3 }, cell3));

      return ReactDOMFactories.table({ className: panelClass }, ReactDOMFactories.tbody({}, rows));
    }
  }

  OptionPane.propTypes = {
    buttons: PropTypes.shape().isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
    title: PropTypes.string.isRequired,

    buttonsClass: PropTypes.string,
    icon: PropTypes.shape(),
    initialInput: PropTypes.shape(),
    messageClass: PropTypes.string,
    panelClass: PropTypes.string,
    titleClass: PropTypes.string
  };

  OptionPane.defaultProps = {
    buttonsClass: "pa2 tr",
    icon: undefined,
    initialInput: undefined,
    messageClass: "",
    panelClass: "ba center v-top",
    titleClass: "b bg-light-gray f4 tc"
  };

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
        const cell = ReactUtilities.createCell(radioButton);
        return ReactUtilities.createRow(cell, item.key);
      };
      const radioButtons = items.map(mapFunction);

      return ReactUtilities.createTable(radioButtons, "radioButtonTable", "radio-button-table");
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
      const { id, values, initialValue } = this.props;
      const options = R.map((value) => createOption(value.key, value.label), values);

      return ReactDOMFactories.select(
        { id, defaultValue: initialValue, onChange: this.handleChange },
        options
      );
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

    id: PropTypes.string,
    initialValue: PropTypes.string,
  };

  Select.defaultProps = {
    id: "select",
    initialValue: undefined,
  };

  class StringInput extends React.PureComponent {
    constructor(props) {
      super(props);

      const { initialValue } = this.props;
      this.state = { value: initialValue };

      this.handleBlur = this.handleBlurFunction.bind(this);
      this.handleChange = this.handleChangeFunction.bind(this);
    }

    handleBlurFunction() {
      const { onBlur } = this.props;
      const { value } = this.state;

      onBlur(value);
    }

    handleChangeFunction(event) {
      const { value } = event.target;

      this.setState({ value });
    }

    render() {
      const { className, id, initialValue } = this.props;

      return ReactDOMFactories.input({
        id,
        type: "text",
        className,
        defaultValue: initialValue,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
      });
    }
  }

  StringInput.propTypes = {
    onBlur: PropTypes.func.isRequired,

    id: PropTypes.string,
    className: PropTypes.string,
    initialValue: PropTypes.string,
  };

  StringInput.defaultProps = {
    id: "stringInput",
    className: undefined,
    initialValue: "",
  };

  class TitledElement extends React.Component {
    render() {
      const { className, element, elementClass, title, titleClass } = this.props;

      const titleCell = ReactUtilities.createCell(title, "titleCell", titleClass);
      const elementCell = ReactUtilities.createCell(element, "elementCell", elementClass);

      const rows = [ReactUtilities.createRow(titleCell, "titleRow"), ReactUtilities.createRow(elementCell, "elementRow")];

      return ReactUtilities.createTable(rows, "titledElementTable", className);
    }
  }

  TitledElement.propTypes = {
    element: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,

    className: PropTypes.string,
    elementClass: PropTypes.string,
    titleClass: PropTypes.string
  };

  TitledElement.defaultProps = {
    className: "bg-light-gray ma1",
    elementClass: "ma0 tc v-mid",
    titleClass: "b f5 ph1 pt1 tc"
  };

  const ReactComponent = {};

  ReactComponent.CheckboxPanel = CheckboxPanel;
  ReactComponent.CollapsiblePane = CollapsiblePane;
  ReactComponent.LayeredCanvas = LayeredCanvas;
  ReactComponent.NumberInput = NumberInput;
  ReactComponent.OptionPane = OptionPane;
  ReactComponent.RadioButtonPanel = RadioButtonPanel;
  ReactComponent.ReactUtilities = ReactUtilities;
  ReactComponent.Select = Select;
  ReactComponent.StringInput = StringInput;
  ReactComponent.TitledElement = TitledElement;

  Object.freeze(ReactComponent);

  return ReactComponent;

})));

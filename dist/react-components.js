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
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]).isRequired,
    onChange: PropTypes.func.isRequired,

    isChecked: PropTypes.bool,
    labelFunction: PropTypes.func,
  };

  Checkbox.defaultProps = {
    isChecked: false,
    labelFunction: (item) => ReactDOMFactories.span({ className: "v-mid" }, item),
  };

  const ReactUtilities = {};

  const merge = (obj1, obj2) => ({ ...obj1, ...obj2 });

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
      className: `flex flex-wrap${className ? ` ${className}` : ""}`,
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

  const defaultKeyFunction$1 = (item) => (typeof item === "object" ? JSON.stringify(item) : item);

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

    render() {
      const { className, items, keyFunction, labelFunction } = this.props;
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

      return ReactUtilities.createTable(rows, "checkboxPanel", className);
    }
  }

  CheckboxPanel.propTypes = {
    applyOnClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
    ).isRequired,

    className: PropTypes.string,
    keyFunction: PropTypes.func,
    labelFunction: PropTypes.func,
    selectedItems: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
    ),
    useSelectButtons: PropTypes.bool,
  };

  CheckboxPanel.defaultProps = {
    className: undefined,
    keyFunction: defaultKeyFunction$1,
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
      const { element, elementClass } = this.props;
      const { isExpanded } = this.state;
      const className = isExpanded ? "dtc pa1 v-mid" : "dn";

      return ReactDOMFactories.div(
        { key: "elementCell", className: `${elementClass} ${className}` },
        element
      );
    }

    createTitleCell() {
      const { title, titleClass } = this.props;
      const { isExpanded } = this.state;
      const titleCell = ReactUtilities.createCell(title, "titleCell", "v-mid");
      const expandLabel = isExpanded ? "\u25B6" : "\u25BC";
      const expandControl = ReactDOMFactories.div(
        { key: "expandCell", className: "dtc fr v-mid", onClick: this.toggleExpand },
        expandLabel
      );
      const row = ReactUtilities.createRow([titleCell, expandControl], "titleExpandRow");
      const table = ReactUtilities.createTable(row, "titleExpandTable", `w-100`);

      return ReactUtilities.createCell(table, "titleCell", titleClass);
    }

    toggleExpandFunction() {
      const { isExpanded: oldIsExpanded } = this.state;

      this.setState({ isExpanded: !oldIsExpanded });
    }

    render() {
      const { className } = this.props;

      const titleCell = this.createTitleCell();
      const elementCell = this.createElementCell();

      const rows = [ReactUtilities.createRow(titleCell, "titleRow"), ReactUtilities.createRow(elementCell, "elementRow")];

      return ReactUtilities.createTable(rows, "collapsiblePaneTable", className);
    }
  }

  CollapsiblePane.propTypes = {
    element: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,

    className: PropTypes.string,
    elementClass: PropTypes.string,
    isExpanded: PropTypes.bool,
    titleClass: PropTypes.string,
  };

  CollapsiblePane.defaultProps = {
    className: "bg-light-gray ma1",
    elementClass: "ma0 tc v-mid",
    isExpanded: false,
    titleClass: "b f5 ph1 pt1 tl",
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
    className: "ba center v-top",
    icon: undefined,
    initialInput: undefined,
    inputClass: "",
    messageClass: "",
    titleClass: "b bg-light-gray f4 tc",
  };

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
        className: "v-mid",
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

  const defaultKeyFunction = (item) => (typeof item === "object" ? JSON.stringify(item) : item);

  class RadioButtonPanel extends React.PureComponent {
    constructor(props) {
      super(props);

      const { selectedItem } = this.props;
      this.state = { selectedItem };
      this.handleApply = this.handleApplyFunction.bind(this);
      this.handleChange = this.handleChangeFunction.bind(this);
    }

    handleApplyFunction() {
      const { applyOnClick } = this.props;
      const { selectedItem } = this.state;

      applyOnClick(selectedItem);
    }

    handleChangeFunction(item) {
      this.setState({ selectedItem: item });
    }

    createButtonTable() {
      const applyButton = ReactUtilities.createButton("Apply", "applyButton", undefined, {
        onClick: this.handleApply,
      });
      const applyCell = ReactUtilities.createCell(applyButton, "applyCell");
      const cells = applyCell;

      const row = ReactUtilities.createRow(cells, "buttonRow");

      return ReactUtilities.createTable(row, "buttonTable", "button-table");
    }

    render() {
      const { className, items, keyFunction, labelFunction } = this.props;
      const { selectedItem } = this.state;

      const mapFunction = (item) => {
        const isChecked = selectedItem === item;
        const radioButton = React.createElement(RadioButton, {
          item,
          isChecked,
          labelFunction,
          onChange: this.handleChange,
        });
        const cell = ReactUtilities.createCell(radioButton);
        return ReactUtilities.createRow(cell, keyFunction(item));
      };
      const radioButtons = items.map(mapFunction);
      const table = ReactUtilities.createTable(radioButtons, "radioButtonTable", "radio-button-table");
      const scrollPane = ReactDOMFactories.div({ className: "scroll-pane" }, table);

      const cell0 = ReactUtilities.createCell(scrollPane, "radioButtonCell", "radio-button-cell");
      const cell1 = ReactUtilities.createCell(this.createButtonTable(), "buttonCell", "button-cell");

      const rows = [
        ReactUtilities.createRow(cell0, "radioButtonRow", "radio-button-row"),
        ReactUtilities.createRow(cell1, "buttonRow", "button-row"),
      ];

      return ReactUtilities.createTable(rows, "radioButtonPanel", className);
    }
  }

  RadioButtonPanel.propTypes = {
    applyOnClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()])
    ).isRequired,

    className: PropTypes.string,
    keyFunction: PropTypes.func,
    labelFunction: PropTypes.func,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
  };

  RadioButtonPanel.defaultProps = {
    className: undefined,
    keyFunction: defaultKeyFunction,
    labelFunction: undefined,
    selectedItem: undefined,
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
    createTitleCell() {
      const { title, titleClass } = this.props;

      return ReactUtilities.createCell(title, "titleCell", titleClass);
    }

    createElementCell() {
      const { element, elementClass } = this.props;

      return ReactUtilities.createCell(element, "elementCell", elementClass);
    }

    render() {
      const { className } = this.props;

      const titleCell = this.createTitleCell();
      const elementCell = this.createElementCell();

      const rows = [ReactUtilities.createRow(titleCell, "titleRow"), ReactUtilities.createRow(elementCell, "elementRow")];

      return ReactUtilities.createTable(rows, "titledElementTable", className);
    }
  }

  TitledElement.propTypes = {
    element: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,

    className: PropTypes.string,
    elementClass: PropTypes.string,
    titleClass: PropTypes.string,
  };

  TitledElement.defaultProps = {
    className: "bg-light-gray ma1",
    elementClass: "ma0 tc v-mid",
    titleClass: "b f5 ph1 pt1 tc",
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

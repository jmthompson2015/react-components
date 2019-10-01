(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ReactComponent = factory());
}(this, function () { 'use strict';

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

  class TitledElement extends React.Component {
    render() {
      const { className, element, title, titleClass } = this.props;

      const titleCell = ReactUtilities.createCell(title, "titleCell", titleClass);
      const elementCell = ReactUtilities.createCell(element, "elementCell");

      const rows = [ReactUtilities.createRow(titleCell, "titleRow"), ReactUtilities.createRow(elementCell, "elementRow")];

      return ReactUtilities.createTable(rows, "titledElementTable", className);
    }
  }

  TitledElement.propTypes = {
    element: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,

    className: PropTypes.string,
    titleClass: PropTypes.string
  };

  TitledElement.defaultProps = {
    className: "bg-light-gray ma1",
    titleClass: "b f5 ph1 pt1 tc"
  };

  const ReactComponent = {};

  ReactComponent.LayeredCanvas = LayeredCanvas;
  ReactComponent.OptionPane = OptionPane;
  ReactComponent.ReactUtilities = ReactUtilities;
  ReactComponent.TitledElement = TitledElement;

  Object.freeze(ReactComponent);

  return ReactComponent;

}));

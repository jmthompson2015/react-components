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

export default ReactUtilities;

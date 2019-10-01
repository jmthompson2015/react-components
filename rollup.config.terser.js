const { terser } = require("rollup-plugin-terser");

export default {
  input: "ReactComponent.js",
  output: {
    file: "./dist/react-components.min.js",
    format: "umd",
    name: "ReactComponent"
  },
  plugins: [terser()]
};

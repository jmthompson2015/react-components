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

export default LayeredCanvas;

// old javascript

const path = require("path");
// import blahblah, nodejs에서 절대경로 잡아주는 module
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// __dirname은 nodejs global variable
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  module: {
    rules: [
      // .scss 파일을 찾고 scss를 css로 바꾸고
      // 그 css의 텍스트를 추출하고 추출된 css를 하나의 파일로 만듬
      {
        test: /\.(scss)$/, // regular expression 이용
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]) // extract text plugin, loader 이용, 아래부터 위로 변환됨
      }
    ]
  },
  output: {
    // 아웃풋은 항상 object여아만함
    path: OUTPUT_DIR,
    filename: "[name].js" // webpack에서 제공하는 뭐그런거
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config; // export defualt 못씀

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/client/index.tsx', // The entry point for your plugin code
    index: './src/server/index.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp)$/, loader: 'url-loader' },

      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                }
              }]
            }
          }
        }]
      },
    ],
  },


  resolve: {
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.svg'],
    alias: {
      "@components": path.resolve(__dirname, "src/client/components/"),
      "@icons": path.resolve(__dirname, "src/client/assets/icons/"),
      "@styles": path.resolve(__dirname, "src/client/styles/"),
      "@lib": path.resolve(__dirname, "src/client/lib/"),
      "@ctypes": path.resolve(__dirname, "src/client/lib/types/"),
      "@templates":path.resolve(__dirname,"src/client/templates/")
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    clean:true
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      filename: 'index.html',
      chunks: ['ui'],
      inject: "body",
      cache: false //refresh html on watch
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    port: 4220,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                { loose: true }, // Ensure "loose" mode for class properties
              ],
              [
                '@babel/plugin-proposal-private-methods',
                { loose: true }, // Ensure "loose" mode for private methods
              ],
              [
                '@babel/plugin-proposal-private-property-in-object',
                { loose: true }, // Ensure "loose" mode for private properties
              ],
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.ttf$/, // Load .ttf font files
        loader: 'url-loader', // Use url-loader to handle fonts
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'), // Include vector icons fonts
      },
    ],
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main-web.tsx',
      index: './src/index.html',
      outputPath: 'dist/apps/DrinkTeamWeb',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: [],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // svgr: false
    }),
  ],
};

const Webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const Path = require('path');
const _ = require('lodash');

const TARGET = process.env.npm_lifecycle_event;
const paths = {
  app: Path.join(__dirname, 'app'),
  build: Path.join(__dirname, 'build')
};


// Pass `npm_lifecycle_event` to .babelrc
process.env.BABEL_ENV = TARGET;

const common = {
  // TODO: Keep react-hot-loader updated, because it's in alpha
  entry: [
    'react-hot-loader/patch',
    paths.app
  ],
  // Add resolve.extensions
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: paths.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        // Include accepts either a path or an array of paths.
        include: paths.app
      },
      {
        test: /\.jsx?$/,
         // Enable caching for improved performance during developement
         // it uses default OS directory by default. If you need something
         // custom, pass a path to it (i.e babel?cacheDirectory=<path>).
        loaders: ['babel?cacheDirectory'],
         // Parse only app files! Without this, it will go through the entire
         // project. In addition to being slow, it will most likely result in an
         // error
        include: paths.app
      }
    ]
  }

};

// Default configuration. We will return this if Webpack
// is called outside of npm
if (TARGET === 'start' || !TARGET) {
  module.exports = _.merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: paths.build,

      // Enable history API fallback so HTML5 History Api based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set:
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      // will detect changes made to Webpack configuration and the
      // projects files and install the dependencies for us
      new NpmInstallPlugin({ save: true /* --save */ })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = _.merge(common, {});
}

const pkg = require('./package.json');
const year = (new Date()).getFullYear();

export default {
  entry: 'src/threshold.js',
  dest: 'dist/threshold.js',
  format: 'umd',
  globals: [
    'window'
  ],
  indent: true,
  useStrict: true,
  moduleName: 'threshold',
  banner: `/* ${ pkg.name } v${ pkg.version } - ${ year } Jeremias Menichelli - MIT License */`
};

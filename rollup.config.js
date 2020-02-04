import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import packageJSON from './package.json';

const input = './src/index.js';
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

export default [
  // CommonJS
  {
    input,
    output: {
      file: 'lib/main.min.js',
      format: 'cjs'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      external(),
      resolve(),
      commonjs(),
      uglify()
    ]
  },
  // UMD
  {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: 'umd',
      name: 'reactPulpo',
      globals: {
        react: 'React',
        'prop-types': 'prop-types',
        'styled-components': 'styled',
        '@fortawesome/free-solid-svg-icons': 'free-solid-svg-icons',
        '@fortawesome/react-fontawesome': 'react-fontawesome'
      }
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  },
  //ES
  {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: 'es',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  }
];

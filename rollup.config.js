import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const name = toModuleName(pkg.name);


export default {
  input: './src/index.js',
  output: {
    name,
    file: './dist/index.js',
    format: 'umd',
    banner: `/*!\n * ${name}\n * (c) 2019 Yong Quan Lim\n * Released under MIT License.\n */`
  },
  plugins: [
    babel()
  ]
}


function toModuleName(name){
  return name.split('-')
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');
}

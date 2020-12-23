import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());
  
console.log('name: ', name)

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.module, 'format': 'en' },
    { file: pkg.main, 'format': 'umd', name: name }
  ],
  plugins: [
    svelte(),
    resolve()
  ],
};
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

const onwarn = (warning, onwarn) => {
  const isCircularWarning = warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message); // only for @sapper
  const isOnBlurInsteadOfOnChangeWarning = warning.code === 'PLUGIN_WARNING' && warning.pluginCode && warning.pluginCode === 'a11y-no-onchange';

  return isCircularWarning
    || isOnBlurInsteadOfOnChangeWarning
    || onwarn(warning);
}
  
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
  client: {
    onwarn,
  },
  server: {
    onwarn,
  },
};
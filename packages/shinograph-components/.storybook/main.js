const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
const yaml = require('@rollup/plugin-yaml');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: sveltePreprocess(),
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        alias: {
          $types: path.resolve('./src/@types'),
          $lib: path.resolve('./src/lib'),
          $atoms: path.resolve('./src/atoms'),
          $molecules: path.resolve('./src/molecules'),
          $organisms: path.resolve('./src/organisms'),
          $templates: path.resolve('./src/templates'),
        },
      },
      plugins: [...config.plugins, yaml()],
    }
  },
}

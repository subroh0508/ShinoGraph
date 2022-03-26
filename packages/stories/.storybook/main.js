const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
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
          $lib: path.resolve('./src/lib'),
        },
      },
    }
  },
}

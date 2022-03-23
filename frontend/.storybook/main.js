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
      define: {
        'process.env.BASE_URL': "'http://localhost:3000'",
        'process.env.PRERENDER_BASE_URL': "'http://sparql-endpoint:3000'",
      },
      resolve: {
        alias: {
          $types: path.resolve('./src/@types'),
          $lib: path.resolve('./src/lib'),
          $components: path.resolve('./src/components'),
        },
      },
      plugins: [...config.plugins, yaml()],
    }
  },
}

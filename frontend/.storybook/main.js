const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');

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
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: sveltePreprocess(),
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];

    return config;
  },
}

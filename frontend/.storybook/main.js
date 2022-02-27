const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');

// @see: https://gist.github.com/bryanmylee/500a97a4e42f40c71b6a9d0dd0d72f16
const replaceFileExtension = (filePath, newExtension) => {
  const { name, root, dir } = path.parse(filePath);
  return path.format({
    name,
    root,
    dir,
    ext: newExtension,
  });
};

const fixCjsGeneratedStories = (config) => {
  // Find the plugin instance that needs to be mutated
  const virtualModulesPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'VirtualModulesPlugin',
  );
  // Change the file extension to .cjs for all files that end with "generated-stories-entry.js"
  virtualModulesPlugin._staticModules = Object.fromEntries(
    Object.entries(virtualModulesPlugin._staticModules).map(([key, value]) => {
      if (key.endsWith('generated-stories-entry.js')) {
        return [replaceFileExtension(key, '.cjs'), value];
      }
      return [key, value];
    }),
  );
  // Change the entry points to point to the appropriate .cjs files
  config.entry = config.entry.map((entry) => {
    if (entry.endsWith('generated-stories-entry.js')) {
      return replaceFileExtension(entry, '.cjs');
    }
    return entry;
  });
  return config;
};

const noFullySpecified = (config) => {
  // Remove fully-specified file-extension requirement.
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];
  return config;
};

const sveltekitAlias = (config) => {
  // Set SvelteKit aliases.
  config.resolve.alias = {
    ...config.resolve.alias,
    svelte: `${__dirname}/../node_modules/svelte`,
    $lib: `${__dirname}/../src/lib`,
  };
  return config;
};

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
    builder: 'webpack5',
  },
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: sveltePreprocess(),
  },
  webpackFinal: async (config) => {
    config = fixCjsGeneratedStories(config);
    config = noFullySpecified(config);
    config = sveltekitAlias(config);

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];

    return config;
  },
}

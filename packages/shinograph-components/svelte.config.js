import path from 'path';
import preprocess from 'svelte-preprocess';
import yaml from '@rollup/plugin-yaml';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    vite: {
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
      plugins: [yaml()],
    },
  },
};

export default config;

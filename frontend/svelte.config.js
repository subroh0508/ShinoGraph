import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },
    vite: {
      define: {
        'process.env.BASE_URL': dev ? "'http://localhost:3000'" : "'https://283db.org'",
        'process.env.PRERENDER_BASE_URL': dev ? "'http://sparql-endpoint:3000'" : "'https://283db.org'",
      },
    },
  },
};

export default config;

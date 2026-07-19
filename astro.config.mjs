import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://techynovice.com/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'night-owl',
    },
  },
  redirects: {
    '/2017/03/19/cach-gap-fork-mot-repository-tren-github/':
      '/cach-gap-fork-mot-repository-tren-github/',
  },
});

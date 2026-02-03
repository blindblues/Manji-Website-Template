// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://blindblues.github.io',
    base: '/Manji-Website-Template',
    integrations: [react()],
    output: 'static',
    build: {
        format: 'directory'
    }
});

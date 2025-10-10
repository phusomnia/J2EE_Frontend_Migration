// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import pages from 'astro-pages';

const groupPattern = (/\/?\([^/]+?\)/g);

// https://astro.build/config
export default defineConfig({
    server: {
        port: 3000
    },
    vite: {
        plugins: [tailwindcss()]
    },
    output: "server",
    integrations: [
        react(),
        // Pages
        pages({
            dir: "features",
            pattern: ({ pattern }) => {
                const group = pattern.replace(groupPattern, "");
                return group;
            },
            log: "verbose"
        })
    ]
});

import fs from 'fs';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from 'path';
import autoPreprocess, { typescript } from 'svelte-preprocess';
const projectRootDir = resolve(__dirname);

let host = 'willikers.dev';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        svelte({
            preprocess: autoPreprocess(),
        }),
        typescript({
            sourceMap: false
        })
    ],
    optimizeDeps: {
        include: [
            '@inertiajs/inertia',
            '@inertiajs/inertia-svelte',
        ]
    },
    resolve: {
        alias: {
            '@': resolve(projectRootDir, 'resources/js'),
            '~': resolve(projectRootDir, 'resources'),
        },
        extensions: ['.js', '.svelte', '.json'],
    },
    // server: {
    //     https: true,
    //     plugins: [mkcert()],
    // },
    server: detectServerConfig(host),
});


function detectServerConfig(host) {
    let keyPath = resolve(projectRootDir, 'storage/ssl/host.key');
    let certificatePath = resolve(projectRootDir, 'storage/ssl/host.crt');

    if (!fs.existsSync(keyPath)) {
        return {};
    }

    if (!fs.existsSync(certificatePath)) {
        return {};
    }

    return {
        hmr: host,
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    };
}

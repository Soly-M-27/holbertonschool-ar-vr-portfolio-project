import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
const path = require('path');

export default defineConfig(() => {
    console.log("Vite starts going through config");
    return {
        envPrefix: 'REACT_APP_',
        build: {
            outDir: 'build',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        },
        plugins: [
            react(),
            envCompatible(),
        ],
        server: {
            fsSever: {
                root: '.',
                strict: true,
                port: 1776,
            },
        },
    },
    console.log("Vite finish")
});
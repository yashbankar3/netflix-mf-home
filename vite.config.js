import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            react(),
            federation({
                name: 'home_app',
                filename: 'remoteEntry.js',
                exposes: {
                    './HomePage': './src/pages/HomePage.jsx',
                     './BrowseApp': './src/App.jsx',

                },
                remotes: {
                    shared_ui: `${env.VITE_SHARED_UI_URL || 'http://localhost:3001'}/assets/remoteEntry.js`,
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: '^18.2.0',
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: '^18.2.0',
                    },
                    'react-router-dom': {
                        singleton: true,
                        requiredVersion: '^6.20.1',
                    },
                },
            }),
        ],
        build: {
            target: 'esnext',
            modulePreload: false,
            minify: 'esbuild',
            cssCodeSplit: true,
        },
        server: {
            port: 3003,
            strictPort: true,
            cors: true,
        },
        preview: {
            port: 3003,
            strictPort: true,
            cors: true,
        },
    };
});

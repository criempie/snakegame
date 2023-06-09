import path from 'path';

export default {
    root: './src',
    base: '/snakegame/',
    build: {
        outDir: '../dist',
    },
    publicDir: '../public',
    resolve: {
        alias: {
            '~/engine': path.resolve(__dirname, './src/engine'),
            '~/game': path.resolve(__dirname, './src/game'),
        }
    }
}
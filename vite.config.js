import path from 'path';

export default {
    root: './src',
    publicDir: '../public',
    resolve: {
        alias: {
            '~/engine': path.resolve(__dirname, './src/engine'),
            '~/game': path.resolve(__dirname, './src/game'),
        }
    }
}
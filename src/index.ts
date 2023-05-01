import { MyGame } from './game';

function main() {
    const appElement = document.getElementById('app');
    if (!appElement) return;

    const game = new MyGame(appElement);
    game.start();
}

main();
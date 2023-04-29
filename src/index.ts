import Game from './components/game';

function main() {
    const appElement = document.getElementById('app');
    if (!appElement) return;

    const game = new Game(appElement);
    game.render();
}

main();
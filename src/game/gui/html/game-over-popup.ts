export function gameOverPopup(text: string) {
    const container = document.createElement('div');
    container.className = 'popup';

    const textEl = document.createElement('span');
    textEl.className = 'popup__text';
    textEl.innerText = text;

    container.appendChild(textEl);
    return container;
}
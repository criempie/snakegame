export function canvas(size: [number, number]) {
    const container = document.createElement('div');
    container.className = 'canvas';

    const canvasElement = document.createElement('canvas');
    canvasElement.className = 'canvas__element';

    canvasElement.tabIndex = 0;
    canvasElement.width = size[0];
    canvasElement.height = size[1];

    container.appendChild(canvasElement);

    return container;
}
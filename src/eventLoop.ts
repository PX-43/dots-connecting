import IDrawable from './interfaces/IDrawable';

const drawables: IDrawable[] = [];

const startLoop = () => {
    if (drawables.length === 0) { run(); }
};

const run = (): void => {
    drawables.forEach(d => d.draw());
    window.requestAnimationFrame(() => run());
};

const registerCanvas = (drawable: IDrawable) => {
    startLoop();
    drawables.unshift(drawable);
};

const subscribe = (drawable: IDrawable) => {
    startLoop();
    if (!drawables.includes(drawable)) {
        drawables.push(drawable);
    }
};

const unsubscribe = (drawable: IDrawable) => {
    const index = drawables.indexOf(drawable);
    if (index > -1) {
        drawables.splice(index, 1);
    }
};

const eventLoop = Object.freeze({
    registerCanvas,
    subscribe,
    unsubscribe,
});

export default eventLoop;

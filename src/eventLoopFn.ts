import IDrawable from './interfaces/IDrawable';

const drawables: IDrawable[] = [];

const run = (): void => {
    drawables.filter((d) => d.canDraw)
             .forEach((d) => d.draw());
    window.requestAnimationFrame(() => run());
};

const registerCanvas = (drawable: IDrawable) => {

    if (drawables.length === 0) {
        run();
    }

    drawables.unshift(drawable);
};

const subscribe = (drawable: IDrawable) => {
    if (!drawables.includes(drawable)) {
        drawables.push(drawable);
    }
};

const unsubscribe = (drawable: IDrawable) => {
    const index = drawables.indexOf(drawable);
    if (index > -1) {
        drawables.slice(index, 1);
    }
};

const eventLoopFn = Object.freeze({
    registerCanvas,
    subscribe,
    unsubscribe,
});

export default eventLoopFn;

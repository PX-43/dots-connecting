
export enum DrawFrequency { ONCE, CONTINUOUS }
export default interface IDrawable {
    updateFn: () => void;
    drawFrequency: DrawFrequency;
    draw(): void;
    stopDrawing(): void;
}


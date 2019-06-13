
export default interface IDrawable {
    updateFn: () => void;
    draw(): void;
    stopDrawing(): void;
}


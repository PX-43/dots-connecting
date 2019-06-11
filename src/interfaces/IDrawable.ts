
export default interface IDrawable {
    updateFn: () => void;
    canDraw: boolean;
    draw(): void;
}


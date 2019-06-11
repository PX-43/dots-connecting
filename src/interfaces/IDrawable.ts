
export default interface IDrawable {
    draw(): void;
    updateFn: Function;
    canDraw:boolean;
}


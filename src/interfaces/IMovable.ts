import IDrawable from './IDrawable';

export default interface IMovable {
    speed: number;
    xDirection: number;
    yDirection: number;
    xVelocity: number;
    yVelocity: number;
    setMoveFn( fn: () => void): void;
}

import IDrawable from './IDrawable';
import IPositionable from './IPositionable';

export default interface ICircle extends IDrawable, IPositionable {
    r: number;
    alpha: number;
    fillColour: string;
    strokeColour: string;
    strokeWidth: number;
    shadowBlur: number;
    update(...fns: Array<(c: ICircle) => void>): void;
}

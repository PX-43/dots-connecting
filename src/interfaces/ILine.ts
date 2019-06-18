import IDrawable from './IDrawable';
import IPoint from './IPoint';

export default interface ILine extends IDrawable {
    startPos: IPoint;
    endPos: IPoint;
    alpha: number;
    strokeColour: string;
    lineWidth: number;
}

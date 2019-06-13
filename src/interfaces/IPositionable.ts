import IBoundary from './IBoundary';
import IPoint from './IPoint';

export default interface IPositionable {
    position: IPoint;
    boundary: IBoundary;
    isWithinRect(pos1: IPoint, pos2: IPoint): boolean;
}

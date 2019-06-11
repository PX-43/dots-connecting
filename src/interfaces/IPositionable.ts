import IPoint from "./IPoint";
import IBoundary from "./IBoundary";

export default interface IPositionable {
    position:IPoint;
    boundary:IBoundary;
    isWithinRect(pos1:IPoint, pos2:IPoint): boolean;
}
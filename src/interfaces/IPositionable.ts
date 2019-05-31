
export default interface IPositionable {
    x:number;
    y:number;
    z:number;
    isWithinRect(x1:number, y1:number, x2:number, y2:number): boolean;
}
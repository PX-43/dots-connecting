import Canvas from './Canvas';
//import EventLoop from './EventLoop';
import IDrawable from "./interfaces/IDrawable";
import IPoint from "./interfaces/IPoint";
import {getUUID} from "./util";

export default class Line implements IDrawable {

    private constructor() {}
    private updateFn = () => {};
    id = getUUID();
    startPos:IPoint = {x:0, y:0, z:0};
    endPos:IPoint = {x:0, y:0, z:0};

    alpha = 1;
    strokeColour = '#fffa00';
    lineWidth = 1;

    draw(): void {

        this.updateFn();

        Canvas.ctx.save();
        Canvas.ctx.globalAlpha = this.alpha;
        Canvas.ctx.moveTo(this.startPos.x, this.startPos.y);
        Canvas.ctx.lineTo(this.endPos.x, this.endPos.y);
        Canvas.ctx.lineWidth = this.lineWidth;
        Canvas.ctx.strokeStyle = this.strokeColour;
        Canvas.ctx.stroke();
        Canvas.ctx.restore();
    }


    setUpdateFn(fn: (c:Line) => void) {
        this.updateFn = () => fn(this);
    }

    static create(startPos:IPoint, endPos:IPoint): Line {
        const line = new Line();
        line.startPos = startPos;
        line.endPos = endPos;
        return line;
    }
}
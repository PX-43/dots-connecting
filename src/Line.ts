import Canvas from './Canvas';
import EventLoop from './EventLoop';
import IDrawable from "./interfaces/IDrawable";
import IPoint from "./interfaces/IPoint";

export default class Line implements IDrawable {

    private constructor() {}
    private updateFn = () => {};

    canDraw = true;
    startPos:IPoint;
    endPos:IPoint;
    z = 1;

    alpha = 1;
    shadowBlur = 0;
    strokeColour = '#fffa00';

    draw(): void {
        if(!this.canDraw)
            return;

        this.updateFn();
        //Canvas.ctx.save();
        Canvas.ctx.moveTo(this.startPos.x, this.startPos.y);
        Canvas.ctx.lineTo(this.endPos.x, this.endPos.y);
        Canvas.ctx.lineWidth = 1;
        Canvas.ctx.strokeStyle = this.strokeColour;
        Canvas.ctx.stroke();
        //Canvas.ctx.restore();
    }


    setUpdateFn(fn: (c:Line) => void) {
        this.updateFn = () => fn(this);
    }

    static create(startPos:IPoint, endPos:IPoint, z:number, canDraw:boolean=true): Line {
        const line = new Line();
        line.startPos = startPos;
        line.endPos = endPos;
        line.z = z;
        line.canDraw = canDraw;

        EventLoop.subscribe(line);

        return line;
    }
}
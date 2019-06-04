import canvas from './canvasFn';
import EventLoop from './EventLoop';
import IDrawable from "./interfaces/IDrawable";
import IPositionable from "./interfaces/IPositionable";
import {NO_COLOUR} from "./constants";
import IPoint from "./interfaces/IPoint";

export default class Circle implements IDrawable, IPositionable {

    private constructor() {}
    private updateFn = () => {};

    canDraw = true;
    x = 5;
    y = 5;
    z = 1;
    r = 20;
    alpha = 1;
    fillColour = '#fffa00';
    strokeWidth = 0;
    shadowBlur = 0;
    strokeColour = NO_COLOUR;

    draw(): void {
        if(!this.canDraw)
            return;

        this.updateFn();

        const ctx = canvas.ctx;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.shadowColor = this.fillColour;
        ctx.shadowBlur = this.shadowBlur;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

        if(this.fillColour !== NO_COLOUR){
            ctx.fillStyle = this.fillColour;
            ctx.fill();
        }

        if(this.strokeColour !== NO_COLOUR && this.strokeWidth > 0){
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokeColour;
            ctx.stroke();
        }
        ctx.restore();
    }

    isWithinRect(x1:number, y1:number, x2:number, y2:number): boolean {
        return  (this.x - this.r) > x1 && (this.x + this.r) < x2 &&
                (this.y - this.r) > y1 && (this.y + this.r) < y2;
    }

    setUpdateFn(fn: (c:Circle) => void) {
        this.updateFn = () => fn(this);
    }

    static create(pos:IPoint, r:number, canDraw:boolean=true): Circle {
        const c = new Circle();
        c.x = pos.x;
        c.y = pos.y;
        c.z = pos.z;
        c.r = r;
        c.canDraw = canDraw;

        EventLoop.subscribe(c);

        return c;
    }
}
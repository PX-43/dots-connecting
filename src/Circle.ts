import Canvas from './Canvas';
import EventLoop from './EventLoop';
import IDrawable from "./interfaces/IDrawable";
import IPositionable from "./interfaces/IPositionable";
import {NO_COLOUR, DEFAULT_STROKE_COLOUR} from "./constants";

export default class Circle implements IDrawable, IPositionable {

    private constructor() {}
    private updateFn = () => {};

    canDraw = true;
    x = 5;
    y = 5;
    r = 20;
    fillColour = NO_COLOUR;
    strokeWidth = 1;
    strokeColour = DEFAULT_STROKE_COLOUR;

    draw(): void {
        if(!this.canDraw)
            return;

        this.updateFn();

        Canvas.ctx.beginPath();
        Canvas.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

        if(this.fillColour !== NO_COLOUR){
            Canvas.ctx.fillStyle = this.fillColour;
            Canvas.ctx.fill();
        }

        if(this.strokeColour !== NO_COLOUR && this.strokeWidth > 0){
            Canvas.ctx.lineWidth = this.strokeWidth;
            Canvas.ctx.strokeStyle = this.strokeColour;
            Canvas.ctx.stroke();
        }
    }

    isWithinRect(x1:number, y1:number, x2:number, y2:number): boolean {
        return  (this.x - this.r) > x1 && (this.x + this.r) < x2 &&
                (this.y - this.r) > y1 && (this.y + this.r) < y2;
    }

    setUpdateFn(fn: (c:Circle) => void) {
        this.updateFn = () => fn(this);
    }

    static create(x:number, y:number, r:number, canDraw:boolean=true): Circle {
        const c = new Circle();
        c.x = x;
        c.y = y;
        c.r = r;
        c.canDraw = canDraw;

        EventLoop.subscribe(c);

        return c;
    }
}
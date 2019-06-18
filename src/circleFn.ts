import canvas from './canvasFn';
import { NO_COLOUR, NOOP } from './constants';
import eventLoopFn from './eventLoopFn';
import IBoundary from './interfaces/IBoundary';
import ICircle from './interfaces/ICircle';
import IPoint from './interfaces/IPoint';

export default function createCircle({    position = {x: 5, y: 5, z: 1} as IPoint,
                                          r = 20,
                                          alpha = 1,
                                          fillColour = '#fffa00',
                                          strokeColour = NO_COLOUR,
                                          strokeWidth = 0,
                                          shadowBlur = 0   } = {}): ICircle  {
    let updateFn: () => void = NOOP;
    let isDrawing = false;
    return {
        r,
        position,
        alpha,
        fillColour,
        strokeColour,
        strokeWidth,
        shadowBlur,
        get boundary(): IBoundary {
            return {
                top:    () =>  this.position.y - this.r,
                right:  () =>  this.position.x + this.r,
                bottom: () =>  this.position.y + this.r,
                left:   () =>  this.position.x - this.r,
            };
        },
        set updateFn(fn: () => void ) { updateFn = fn || NOOP; },
        update(...fns: Array<(c: ICircle) => void>): void {
            updateFn = () => fns.forEach(f => f(this));
        },
        draw(): void {
            if (!isDrawing) {
                isDrawing = true;
                eventLoopFn.subscribe(this);
            }

            updateFn();
            const ctx = canvas.ctx;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.shadowColor = this.fillColour;
            ctx.shadowBlur = this.shadowBlur;
            ctx.arc(this.position.x, this.position.y, r, 0, 2 * Math.PI, false);

            if (this.fillColour !== NO_COLOUR) {
                ctx.fillStyle = this.fillColour;
                ctx.fill();
            }

            if (this.strokeColour !== NO_COLOUR && this.strokeWidth > 0) {
                ctx.lineWidth = this.strokeWidth;
                ctx.strokeStyle = this.strokeColour;
                ctx.stroke();
            }
            ctx.restore();
        },

        stopDrawing(): void {
            eventLoopFn.unsubscribe(this);
            isDrawing = false;
        },

        isWithinRect(pos1: IPoint, pos2: IPoint): boolean {
            return  (this.position.x - r) > pos1.x && (this.position.x + r) < pos2.x &&
                (this.position.y - r) > pos1.y && (this.position.y + r) < pos2.y;
        },
    };
}

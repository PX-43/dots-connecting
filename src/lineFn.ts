import canvas from './canvasFn';
import { NOOP } from './constants';
import eventLoopFn from './eventLoopFn';
import ILine from './interfaces/ILine';
import IPoint from './interfaces/IPoint';
import {DrawFrequency} from './interfaces/IDrawable';


export default function createLine({ startPos = {x: 0, y: 0, z: 1} as IPoint,
                                     endPos = {x: 0, y: 0, z: 1} as IPoint,
                                     alpha = 1,
                                     strokeColour = '#fffa00',
                                     lineWidth = 1} = {}): ILine  {
    let isDrawing = false;
    let updateFn: () => void = NOOP;
    return {
        startPos,
        endPos,
        alpha,
        strokeColour,
        lineWidth,
        drawFrequency: DrawFrequency.CONTINUOUS,
        set updateFn(fn: () => void ) { updateFn = fn || NOOP; },
        draw(): void {
            if (!isDrawing && this.drawFrequency === DrawFrequency.CONTINUOUS) {
                isDrawing = true;
                eventLoopFn.subscribe(this);
            }
            updateFn();
            const ctx = canvas.ctx;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.moveTo(this.startPos.x, this.startPos.y);
            ctx.lineTo(this.endPos.x, this.endPos.y);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeColour;
            ctx.stroke();
            ctx.restore();
        },

        stopDrawing(): void {
            eventLoopFn.unsubscribe(this);
            isDrawing = false;
        },
    };
}

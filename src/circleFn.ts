import canvas from './canvasFn';
import eventLoopFn from './eventLoopFn';
import IPoint from "./interfaces/IPoint";
import {NO_COLOUR} from "./constants";

export const createCircle = ({    position = {x:5, y:5, z:1} as IPoint,
                                  r = 20,
                                  canDraw = true,
                                  alpha = 1,
                                  fillColour = '#fffa00',
                                  strokeColour = NO_COLOUR,
                                  strokeWidth = 0,
                                  shadowBlur = 0   } = {}) => {

    const circle = {
        position,
        r,
        canDraw,
        alpha,
        fillColour,
        strokeColour,
        strokeWidth,
        shadowBlur,
        updateFn: ({}) => {},
        draw():void {
            if(!this.canDraw)
                return;

            this.updateFn(this);

            const ctx = canvas.ctx;

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.shadowColor = this.fillColour;
            ctx.shadowBlur = this.shadowBlur;
            ctx.arc(this.position.x, this.position.y, r, 0, 2 * Math.PI, false);

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
        },

        isWithinRect(pos1:IPoint, pos2:IPoint): boolean {
            return  (this.position.x - r) > pos1.x && (this.position.x + r) < pos2.x &&
                (this.position.y - r) > pos1.y && (this.position.y + r) < pos2.y;
        }
    };



    eventLoopFn.subscribe(circle);

    return circle;
};
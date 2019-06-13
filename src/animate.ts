import {NOOP} from './constants';
import IDrawable from './interfaces/IDrawable';
import IPositionable from './interfaces/IPositionable';

export default function toMovable(o: IDrawable & IPositionable,
                                  speed = 0.5,
                                  xDirection = 1,
                                  yDirection = 1) {
    const movable = {
        speed,
        xDirection,
        yDirection,
        xVelocity: 1,
        yVelocity: 1,
        setMoveFn(...fns: Array<() => void>) {
            o.updateFn = (fns && fns.length > 0) ?
                () => fns.forEach(f => f()) : NOOP;
        },
    };
    o.stopDrawing();
    const newMovable =  {...o, ...movable};
    newMovable.draw();

    return newMovable;
}



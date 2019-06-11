import {NOOP} from './constants';
import IDrawable from './interfaces/IDrawable';
import IPositionable from './interfaces/IPositionable';

export default function toMovable(o: IDrawable & IPositionable,
                                  speed: number,
                                  xDirection: number,
                                  yDirection: number) {
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

    return {...o, ...movable};
}



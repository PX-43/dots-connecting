import canvas from './canvasFn';
import {NOOP} from './constants';
import IDrawable from './interfaces/IDrawable';
import IMovable from './interfaces/IMovable';
import IPositionable from './interfaces/IPositionable';
import IRunnable from './interfaces/IRunnable';
import {getRandomInt} from './util';
import withFrameDelay from './withFrameDelay';

const edgeTolerance = 2;
type posDrawType = IDrawable & IPositionable;
type movableType = IMovable & IDrawable & IPositionable;

function toMovable<T extends posDrawType>(o: T,
                                          speed: number,
                                          xDirection: number,
                                          yDirection: number): movableType {
    const movable = {
        speed,
        xDirection,
        yDirection,
        xVelocity: 1,
        yVelocity: 1,
        setMoveFn(fn: () => void) {
            o.updateFn = () => fn();
        },
    };

    o.stopDrawing();
    return {...o, ...movable};
}

export default function animate<T extends posDrawType>(mObj: T,
                                                       speed = 0.5,
                                                       xDirection = 1,
                                                       yDirection = 1): T {

    const movable = toMovable(mObj, speed, xDirection, yDirection);

    movable.xVelocity = Math.random();
    movable.yVelocity = Math.random();

    const getCountdown = (): number => getRandomInt(50, 400);

    const updateXVelocity: IRunnable = withFrameDelay({
        fn: () => movable.xVelocity = Math.random(),
        runPoint: getCountdown(),
        runPointSetFn: () => getCountdown(),
    });

    const updateYVelocity: IRunnable = withFrameDelay({
        fn: () => movable.yVelocity = Math.random(),
        runPoint: getCountdown(),
        runPointSetFn: () => getCountdown(),
    });

    const setDirectionAtEdge = () => {
        if ((movable.boundary.bottom() + edgeTolerance) > canvas.height()) { movable.yDirection =  -1; }
        if ((movable.boundary.top() - edgeTolerance) < 0) { movable.yDirection =  1; }
        if ((movable.boundary.right() + edgeTolerance) > canvas.width()) { movable.xDirection =  -1; }
        if ((movable.boundary.left() - edgeTolerance) < 0) { movable.xDirection =  1; }
    };

    const move = () => {
        setDirectionAtEdge();
        updateXVelocity.perform();
        updateYVelocity.perform();

        movable.position.x += movable.speed * movable.xDirection * movable.xVelocity;
        movable.position.y += movable.speed * movable.yDirection * movable.yVelocity;
    };

    movable.setMoveFn(move);

    return mObj;
}



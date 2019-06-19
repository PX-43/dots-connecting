import canvas from './canvas';
import IDrawable, {DrawFrequency} from './interfaces/IDrawable';
import IMovable from './interfaces/IMovable';
import IPositionable from './interfaces/IPositionable';
import IRunnable from './interfaces/IRunnable';
import createLine from './line';
import {dist, getRandomInt} from './util';
import withFrameDelay from './withFrameDelay';

const edgeTolerance = 2;
type posDrawType = IDrawable & IPositionable;
type movableType = IMovable & IDrawable & IPositionable;

function toMovable<T extends posDrawType>(o: T,
                                          xDirection: number,
                                          yDirection: number,
                                          speed: number ): movableType {
    const movable = {
        speed,
        xDirection,
        yDirection,
        xVelocity: 1,
        yVelocity: 1,
    };

    return {...o, ...movable};
}

export function move<T extends posDrawType>(o: T,
                                            xDirection = 1,
                                            yDirection = 1,
                                            speed = 0.5): () => void {

    const movable = toMovable(o, xDirection, yDirection, speed);

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

    return () => {
        setDirectionAtEdge();
        updateXVelocity.perform();
        updateYVelocity.perform();

        movable.position.x += movable.speed * movable.xDirection * movable.xVelocity;
        movable.position.y += movable.speed * movable.yDirection * movable.yVelocity;
    };
}

// todo: improve performance
export function connectWithLines(c: IPositionable, circles: IPositionable[], connectThreshold = 100): void {
    circles.forEach(otherCircle => {
        if (c !== otherCircle &&
            c.position.z === otherCircle.position.z &&
            c.position.x <= otherCircle.position.x) { // check xpos so only a single line added between 2 dots

            const distance = dist(c.position, otherCircle.position);
            if (distance < connectThreshold ) {
                const line = createLine({startPos: c.position, endPos: otherCircle.position});
                line.drawFrequency = DrawFrequency.ONCE;
                line.lineWidth = 0.08;
                if (c.position.z) {
                    line.alpha = line.alpha / c.position.z;
                }
                line.draw();
            }
        }
    });
}



import {connectWithLines, move} from './animate';
import canvas from './canvasFn';
import createCircle from './circleFn';
import ICircle from './interfaces/ICircle';
import {getRandomInt, pickRandomly, times} from './util';

const connectThreshold = 100;

function createCircles(): ICircle[] {
    const circles: ICircle[] = [];
    const count = 500;
    const colours: string[] = [
        '#ff4652',
        '#d64dff',
        '#18dc6e',
    ];
    const margin = 20;
    const zCoords = [0.5, 1, 2, 3, 4, 5];
    const initX = () => getRandomInt(margin, canvas.width() - margin);
    const initY = () => getRandomInt(margin, canvas.height() - margin);
    const initZ = () => zCoords[ getRandomInt(0, zCoords.length - 1) ];

    times(count)(() => {
        const z = initZ();
        const circleOpt = {
            position: {x: initX(), y: initY(), z},
            r: 6 - z,
            alpha: 1 / z,
            fillColour: colours[ getRandomInt(0, colours.length - 1) ],
        };
        circles.push( createCircle(circleOpt) );
    });

    return circles;
}

const getRandDir = () => pickRandomly([-1, 1]);
const getInitSpeed = (c: ICircle) => c.position.z ? 0.2 / c.position.z : 0.2;
createCircles().forEach((c, _, allCircles) => {
        c.draw();
        c.update(
            move( c, getRandDir(), getRandDir(), getInitSpeed(c)),
            () => connectWithLines( c, allCircles, connectThreshold),
        );
    },
);



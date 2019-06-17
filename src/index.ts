import animate from './animate';
import createCircle from './circleFn';
import {getRandomInt, pickRandomly, times} from './util';
import canvas from './canvasFn';
import ICircle from './interfaces/ICircle';

function createCircles(): ICircle[]{
    const circles: ICircle[] = [];
    const count = 100;
    const colours:string[] = [
        '#ff4652',
        '#d64dff',
        '#18dc6e',
    ];
    const margin = 20;
    const zCoords = [0.5, 1, 2, 3, 4, 5];
    const initX = () => getRandomInt(margin, canvas.width()-margin);
    const initY = () => getRandomInt(margin, canvas.height()-margin);
    const initZ = () => zCoords[ getRandomInt(0, zCoords.length-1) ];

    times(count)(() => {
        const z = initZ();
        const circleOpt = {
            position: {x:initX(), y:initY(), z},
            r: 6 - z,
            alpha: 1 / z,
            fillColour: colours[ getRandomInt(0, colours.length-1) ],
        };
        circles.push( createCircle(circleOpt) );
    });

    return circles;
}

const getRandDir = () => pickRandomly([-1, 1]);
const getInitSpeed = (c:ICircle) => c.position.z ? 0.2 / c.position.z : 0.2;
//createCircles().forEach(c => c.draw());
createCircles().forEach(c => animate(c, getRandDir(), getRandDir(), getInitSpeed(c)).draw());


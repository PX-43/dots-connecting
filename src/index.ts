import move from './animate';
import canvas from './canvasFn';
import createCircle from './circleFn';
import ICircle from './interfaces/ICircle';
import IPositionable from './interfaces/IPositionable';
import createLine from './lineFn';
import {dist, getRandomInt, pickRandomly, times} from './util';
import {DrawFrequency} from './interfaces/IDrawable';

function createCircles(): ICircle[] {
    const circles: ICircle[] = [];
    const count = 100;
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
function connect(c: IPositionable, circles: IPositionable[]): void {
    const minLineCreationDistance = 300;
    circles.forEach(otherCircle => {
            if (c !== otherCircle &&
                c.position.z === otherCircle.position.z &&
                c.position.x <= otherCircle.position.x) { // check xpos so only a single line added between 2 dots

                const distance = dist(c.position, otherCircle.position);
                if (distance < minLineCreationDistance ) {
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
createCircles().forEach((c, _, allCircles) => {
        c.draw();
        c.update(
            move( c, getRandDir(), getRandDir(), getInitSpeed(c)),
            () => connect( c, allCircles ),
        );
    },
);



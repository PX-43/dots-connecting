import Circle from './Circle';
import Canvas from './Canvas';
import Dot from "./Dot";
import Line from "./Line";
import { getRandomInt, dist, pickRandomly } from "./util";

Canvas.background = '#3b3336';

const colours:string[] = [
    '#ff4652',
    '#d64dff',
    '#18dc6e',
];

const dotInitPositionMargin = 20;
const dotCount = 100;
const minLineCreationDistance = 300;
const zCoords = [0.5, 1, 2, 3, 4, 5];
const dots:Dot[] = [];

const dotInitX = () => getRandomInt(dotInitPositionMargin, Canvas.width-dotInitPositionMargin);
const dotInitY = () => getRandomInt(dotInitPositionMargin, Canvas.height-dotInitPositionMargin);
const dotInitZ = () => zCoords[ getRandomInt(0, zCoords.length-1) ];

for(let i = 0; i < dotCount; i++){

    const z = dotInitZ();
    const circle = Circle.create( {x:dotInitX(), y:dotInitY(), z}, 6 - z);
    circle.shadowBlur = 7;
    circle.alpha = circle.alpha / z;
    circle.fillColour = colours[ getRandomInt(0, colours.length-1) ];

    const [xDirection, yDirection] = [pickRandomly([-1, 1]), pickRandomly([-1, 1])];
    dots.push( Dot.create(circle, 0.5 / z, xDirection, yDirection ));
}

dots.forEach(d => {
    d.move(() => {
        dots.forEach(otherDot => {
            const distance = dist(d.position(), otherDot.position());
            if(d !== otherDot &&
                distance < minLineCreationDistance &&
                d.z === otherDot.z &&
                d.position().x <= otherDot.position().x){ //check xpos so only a single line added between 2 dots

                const line = Line.create(d.position(), otherDot.position());
                line.lineWidth = 0.08;
                line.alpha = line.alpha / d.z;
                line.draw();
            }
        })
    });
});



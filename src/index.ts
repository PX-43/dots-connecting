import Circle from './Circle';
import Canvas from './Canvas';
import Dot from "./Dot";
import { getRandomInt, dist } from "./util";

Canvas.background = '#3b3336';

const colours:string[] = [
    '#ff4652',
    '#d64dff',
    '#18dc6e',
];

const dotInitPositionMargin = 20;
const dotCount = 100;
const zCoords = [1, 2, 3];
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

    //todo: set random initial direction for dots
    dots.push( Dot.create(circle, 0.5 / z ));

}

dots.forEach(d => {
    d.move(() => {
        dots.forEach(otherDot => {
            const distance = dist(d.position(), otherDot.position());
            if(d !== otherDot && distance < 10){

                //todo: add lines to connect dots

                /*//todo: only one of them should be changed (how to calculate which one?)
                d.xDirection *= -1;
                d.yDirection *= -1;*/
            }
        })
    });
});



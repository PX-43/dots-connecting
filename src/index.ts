import Circle from './Circle';
import Canvas from './Canvas';
import Dot from "./Dot";
import {getRandomInt} from "./util";

Canvas.background = '#3b3336';

const colours:string[] = [
    '#ff4652',
    '#d64dff',
    '#18dc6e',
];

for(let i = 0; i < 100; i++){
    const circle = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
    circle.shadowBlur = 7;
    circle.fillColour = colours[ getRandomInt(0, colours.length-1) ];
    const dot = Dot.create(circle);
    circle.setUpdateFn( () => dot.move());
}

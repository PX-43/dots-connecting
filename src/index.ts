import Circle from './Circle';
import Canvas from './Canvas';
import {getRandomInt} from "./util";

Canvas.background = '#3b3336';

const speed  = 0.2;
const edgeTolerance = 2;
let xV = 2;
let yV = 2;

let xDirection = 1;
let yDirection = 1;

const setDirection = (c:Circle) => {
    if((c.y + c.r + edgeTolerance) > Canvas.height) yDirection =  -1;
    if((c.y - c.r - edgeTolerance) < 0) yDirection =  1;
    if((c.x + c.r + edgeTolerance) > Canvas.width) xDirection =  -1;
    if((c.x - c.r - edgeTolerance) < 0) xDirection =  1;
};

const circle = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle.shadowBlur = 7;
circle.fillColour = '#ff4652';
circle.setUpdateFn( c => {

    setDirection(c);

    c.x += speed * xDirection;
    c.y += speed * yDirection;


});



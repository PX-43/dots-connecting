import Circle from './Circle';
import Canvas from './Canvas';
import {getRandomInt} from "./util";
import Dot from "./Dot";

Canvas.background = '#3b3336';

const circle = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle.shadowBlur = 7;
circle.fillColour = '#ff4652';
const dot = Dot.create(circle);
circle.setUpdateFn( c => {

    dot.move();


});

/*
let n1 = 0;
let n2 = 1;
for(let i = 0; i < 8; i++) {
    const n_1t = n2;
    n2 = n1 + n2;
    n1 = n_1t;

    //console.log(n1);
}

//console.log(n1);

function fib(n:number): number {

    if(n === 0) return n;

    const res = n + fib(n-1);
    console.log(res);

    return res;
}


fib(4);
*/

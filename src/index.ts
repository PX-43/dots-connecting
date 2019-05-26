import Circle from './Circle';
import Canvas from './Canvas';
import Dot from "./Dot";

Canvas.background = '#3b3336';

const circle = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle.shadowBlur = 7;
circle.fillColour = '#ff4652';
const dot = Dot.create(circle);
circle.setUpdateFn( c => {

    dot.move();

});


let n1 = 0;
let n2 = 1;
for(let i = 0; i < 8; i++) {
    n2 = n2 + n1;
    n1 = n2 - n1;
}

function fib(n:number): number {
    if(n <= 1) return n;
    return fib(n-2) + fib(n-1);
}

const res = fib(9);

console.log(res);


import Circle from './Circle';
import Canvas from './Canvas';
import Dot from "./Dot";
import { createStack } from './stack';

Canvas.background = '#3b3336';

const circle1 = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle1.shadowBlur = 7;
circle1.fillColour = '#ff4652';
const dot1 = Dot.create(circle1);
circle1.setUpdateFn( c => dot1.move());


const circle2 = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle2.shadowBlur = 7;
circle2.fillColour = '#d64dff';
const dot2 = Dot.create(circle2);
circle2.setUpdateFn( c => dot2.move());

const circle3= Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle3.shadowBlur = 7;
circle3.fillColour = '#18dc6e';
const dot3 = Dot.create(circle3);
circle3.setUpdateFn( c => dot3.move());


const stack1 = createStack();
const stack2 = createStack();


stack1.id = 11;
stack2.id = 22;

stack1.push(1);
stack1.push(11);
stack1.push(111);


console.log(`STACK 2: ID: ${stack2.id};  pop: ${stack2.pop()}; length: ${stack2.length}`);
console.log(`STACK 1: ID: ${stack1.id};  pop: ${stack1.pop()}; length: ${stack1.length}`);

stack1.id = 88;
stack2.id = 90;

stack2.push(66);

console.log(`STACK 2: ID: ${stack2.id};  pop: ${stack2.pop()}; length: ${stack2.length}`);
console.log(`STACK 1: ID: ${stack1.id};  pop: ${stack1.pop()}; length: ${stack1.length}`);
import Circle from "./Circle";
import {getRandomInt} from "./util";
import Canvas from "./Canvas";

const speed  = 2;
const edgeTolerance = 2;

export default class Dot  {

    private constructor(c:Circle){
        this.circle = c;
    }

    circle:Circle;
    xVelocity = 1;
    yVelocity = 1;

    private xDirection = 1;
    private yDirection = 1;


    private setDirection = () => {
        if((this.circle.y + this.circle.r + edgeTolerance) > Canvas.height) this.yDirection =  -1;
        if((this.circle.y - this.circle.r - edgeTolerance) < 0) this.yDirection =  1;
        if((this.circle.x + this.circle.r + edgeTolerance) > Canvas.width) this.xDirection =  -1;
        if((this.circle.x - this.circle.r - edgeTolerance) < 0) this.xDirection =  1;
    };

    move():void {

        this.setDirection();

        this.circle.x += speed * this.xDirection;
        this.circle.y += speed * this.yDirection;

    }


    static create(c:Circle):Dot {
        return new Dot(c);
    }

}
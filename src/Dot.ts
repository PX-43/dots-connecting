import Circle from "./Circle";
import {getRandomInt} from "./util";
import Canvas from "./Canvas";
import withFrameDelay from "./withFrameDelay";

const speed  = 0.5;
const edgeTolerance = 2;

export default class Dot  {

    private constructor(c:Circle){
        this.circle = c;
    }

    circle:Circle;
    xVelocity = Math.random();
    yVelocity = Math.random();

    private xDirection = 1;
    private yDirection = 1;

    private static getCountdown(): number { return getRandomInt(50, 400) };

    private setVelocity():void {
        withFrameDelay({
            fn: () => this.xVelocity = Math.random(),
            runPoint: Dot.getCountdown(),
            runPointSetFn: () => Dot.getCountdown(),
        });

        withFrameDelay({
            fn: () => this.yVelocity = Math.random(),
            runPoint: Dot.getCountdown(),
            runPointSetFn: () => Dot.getCountdown(),
        });
    }

    private setDirection = () => {
        if((this.circle.y + this.circle.r + edgeTolerance) > Canvas.height) this.yDirection =  -1;
        if((this.circle.y - this.circle.r - edgeTolerance) < 0) this.yDirection =  1;
        if((this.circle.x + this.circle.r + edgeTolerance) > Canvas.width) this.xDirection =  -1;
        if((this.circle.x - this.circle.r - edgeTolerance) < 0) this.xDirection =  1;
    };

    move():void {

        this.setDirection();
        this.setVelocity();

        this.circle.x += speed * this.xDirection * this.xVelocity;
        this.circle.y += speed * this.yDirection * this.yVelocity;


    }


    static create(c:Circle):Dot {
        return new Dot(c);
    }

}
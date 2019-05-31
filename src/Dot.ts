import Circle from "./Circle";
import {getRandomInt} from "./util";
import Canvas from "./Canvas";
import withFrameDelay from "./withFrameDelay";
import IPoint from "./interfaces/IPoint";

const edgeTolerance = 2;

export default class Dot  {

    private constructor(c:Circle, initSpeed:number){
        this.circle = c;
        this.speed = initSpeed;
    }

    circle:Circle;
    xVelocity = Math.random();
    yVelocity = Math.random();

    position:() => IPoint = () => ({ x:this.circle.x, y:this.circle.y, z:this.circle.z });

    xDirection = 1;
    yDirection = 1;

    speed  = 0.5;

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

    move(update:() => void):void {

        this.circle.setUpdateFn(() => {

            update();

            this.setDirection();
            this.setVelocity();

            this.circle.x += this.speed * this.xDirection * this.xVelocity;
            this.circle.y += this.speed * this.yDirection * this.yVelocity;
        });
    }


    static create(c:Circle, initSpeed:number):Dot {
        return new Dot(c, initSpeed);
    }

}
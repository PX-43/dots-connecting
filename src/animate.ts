import {getRandomInt} from "./util";
import Canvas from "./Canvas";
import withFrameDelay from "./withFrameDelay";
import IPoint from "./interfaces/IPoint";
import IRunnable from "./interfaces/IRunnable";
import IPositionable from "./interfaces/IPositionable";
import IDrawable from "./interfaces/IDrawable";
import {NOOP} from "./constants";

type MovableType = IPositionable | IDrawable;
export default function toMovable(o:MovableType,
                                  speed:number,
                                  xDirection:number,
                                  yDirection:number) {
    const movable = {
        speed,
        xDirection,
        yDirection,
        xVelocity:1,
        yVelocity:1,
        setMoveFn(fn:Function) {

        }
    };

    const movableObj = {...o, ...movable};


    return movableObj;
}



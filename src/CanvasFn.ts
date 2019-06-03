import IDrawable from './interfaces/IDrawable';
import EventLoop from './EventLoop';
import IPositionable from "./interfaces/IPositionable";
import { DEFAULT_CANVAS_BKG_COLOUR } from "./constants";
import IPoint from "./interfaces/IPoint";


let htmlCanvas: HTMLCanvasElement;
let canvas2DContext: CanvasRenderingContext2D;
let backgroundColour: string = DEFAULT_CANVAS_BKG_COLOUR;

//as this is used in the window context (see window.addEventListener above), 'this' would refer
// to the window object. By using an arrow function, lexical scope used, i.e. 'this'
// now refers to the parent object
const setCanvasSize = () : void => {
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
};

const lazilyCreateCanvas = ():void => {
    if(!htmlCanvas) {
        htmlCanvas = <HTMLCanvasElement> document.createElement('canvas');
        document.body.appendChild(htmlCanvas);
        canvas2DContext =  <CanvasRenderingContext2D> htmlCanvas.getContext('2d',{ alpha: false });
        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        EventLoop.registerCanvas({draw});
    }
};

const draw = (): void => {
    lazilyCreateCanvas();
    canvas2DContext.fillStyle = backgroundColour;
    canvas2DContext.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
};

const getCtx = (): CanvasRenderingContext2D => {
    lazilyCreateCanvas();
    return canvas2DContext;
};

const getCanvas = ():HTMLCanvasElement => {
    lazilyCreateCanvas();
    return htmlCanvas;
};

const width = (): number => getCanvas().width;
const height = (): number => getCanvas().height;

const centre = (): IPoint => {
    return {
        x: Math.floor(width() / 2),
        y: Math.floor(height() / 2),
        z:1,
    };
};

const detectEdge = (p:IPositionable) : boolean => !p.isWithinRect(0, 0, width(), height());



const canvasUtils = ():{} => {
    return {
        centre,
        width,
        height,
        detectEdge,
        ctx: () => getCtx(),
    };
};

const canvas = Object.freeze( canvasUtils() );

export default canvas;
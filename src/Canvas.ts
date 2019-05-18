import IDrawable from './interfaces/IDrawable';
import EventLoop from './EventLoop';
import IPositionable from "./interfaces/IPositionable";
import {DEFAULT_CANVAS_BKG_COLOUR} from "./constants";
import IPoint from "./interfaces/IPoint";

export default class Canvas implements IDrawable {

    private static instance: Canvas;
    private readonly htmlCanvas: HTMLCanvasElement;
    private canvas2DContext: CanvasRenderingContext2D;
    private backgroundColour: string = DEFAULT_CANVAS_BKG_COLOUR;

    private constructor() {
        this.htmlCanvas = <HTMLCanvasElement> document.createElement('canvas');
        document.body.appendChild(this.htmlCanvas);
        this.canvas2DContext =  <CanvasRenderingContext2D> this.htmlCanvas.getContext('2d');
        window.addEventListener('resize', this.setCanvasSize);
        this.setCanvasSize();

        EventLoop.registerCanvas(this);
    }

    //as this is used in the window context (see window.addEventListener above), 'this' would refer
    // to the window object. By using an arrow function, lexical scope used, i.e. 'this'
    // now refers to the parent object
    private setCanvasSize = () : void => {
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
    };

    static get ctx(): CanvasRenderingContext2D {
        return Canvas.getInstance().canvas2DContext;
    }

    private static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }

    static get width(): number {
        return Canvas.getInstance().htmlCanvas.width;
    }

    static get height(): number {
        return Canvas.getInstance().htmlCanvas.height;
    }

    static set background(value:string){ Canvas.getInstance().backgroundColour = value; }
    static get background() { return Canvas.getInstance().backgroundColour; }

    static detectEdge(p:IPositionable) : boolean {
        return !p.isWithinRect(0, 0, Canvas.width, Canvas.height);
    }

    static get centre(): IPoint {
        return {
            x: Math.floor(Canvas.width / 2),
            y: Math.floor(Canvas.height / 2),
        };
    }

    draw(): void {
        this.canvas2DContext.fillStyle = this.backgroundColour;
        this.canvas2DContext.fillRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
    }

}
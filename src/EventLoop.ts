import IDrawable from "./interfaces/IDrawable";

export default class EventLoop {

    private static instance: EventLoop;
    private drawables: IDrawable[] = [];

    private constructor() {}

    private run():void{
        this.drawables.forEach(d => d.draw());
        window.requestAnimationFrame(() => this.run());
    }

    static registerCanvas(drawable: IDrawable): void {
        this.getInstance().drawables.unshift(drawable);
    }

    static subscribe(drawable: IDrawable): void {
        if(!this.getInstance().drawables.includes(drawable))
            this.getInstance().drawables.push(drawable);
    }

    static unsubscribe(drawable: IDrawable): void {
        const index = this.getInstance().drawables.indexOf(drawable);
        if(index > -1)
            this.getInstance().drawables.slice(index, 1);
    }

    private static getInstance(): EventLoop {
        if (!EventLoop.instance) {
            EventLoop.instance = new EventLoop();
            EventLoop.instance.run();
        }

        return EventLoop.instance;
    }

}
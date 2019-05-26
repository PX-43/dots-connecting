import ICounterRunnable from "./interfaces/ICounterRunnable";

export default class TaskRunner {


    private static tasks:ICounterRunnable[] = [];

    //{counter:0, fn:()=>{}, runPoint:200, setRunPoint:()=>number}

    static run(){
        TaskRunner.tasks.forEach(t => {

        });
    }

    static register(runnable:ICounterRunnable):void {
        TaskRunner.tasks.push(runnable);
    }

    static unregister(runnable:ICounterRunnable):void {
        const index = TaskRunner.tasks.indexOf(runnable);
        if(index > -1)
            TaskRunner.tasks.slice(index, 1);
    }


}
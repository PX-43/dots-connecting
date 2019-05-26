
export default interface ICounterRunnable {
    fn: () => void;
    runPoint:number;
    runPointSetFn?: () => number;
}

export const createCounterRunnable = (fn: () => void, runPoint:number, runPointSetFn?: () => number ) : ICounterRunnable => {


    return {
        fn,
        runPoint,
        runPointSetFn: runPointSetFn,
        counter:0,
        run(){

        }
    }
};
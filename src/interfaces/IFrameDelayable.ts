
export default interface IFrameDelayable {
    fn: () => void;
    runPoint:number;
    runPointSetFn?: () => number;
}


export default interface IRunnable {
    canPerform:boolean;
    perform: () => void;
}
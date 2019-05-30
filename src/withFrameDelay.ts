import IFrameDelayable from "./interfaces/IFrameDelayable";
import IRunnable from "./interfaces/IRunnable";


const withFrameDelay = (delayable: IFrameDelayable):IRunnable => {

    let counter = delayable.runPoint;
    let canPerform = true;
    const perform = () => {
        if(canPerform) return;

        if(counter <= 0 ){
            delayable.fn();
            counter = delayable.runPointSetFn ?
                        delayable.runPointSetFn() :
                        delayable.runPoint;
        } else {
            counter--;
        }
    };

    return {
        perform,
        get canPerform() {return canPerform;},
        set canPerform(value) {canPerform = value;},
    }
};


export default withFrameDelay;
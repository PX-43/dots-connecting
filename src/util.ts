import IPoint from "./interfaces/IPoint";

export const dist = ( pos1:IPoint, pos2:IPoint ) : number => {
  const xdiff = Math.abs(pos1.x - pos2.x);
  const ydiff = Math.abs(pos1.y - pos2.y);

  return Math.sqrt(xdiff**2 + ydiff**2);
};

export const getRandomInt = (min:number, max:number) : number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickRandomly = <T>(values: T[]): T | undefined =>
    values && values.length > 0 ? values[getRandomInt(0, values.length - 1)] : undefined;

export const getUUID = () => {
    // @ts-ignore
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
};

export const times = (n: number) : (fn: () => void) => void => {
    return (fn: () => void): void => {
        for(let i = 0; i < n; i++) fn();
    }
};
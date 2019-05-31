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
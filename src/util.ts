export const dist = (x1:number, y1:number, x2:number, y2:number) : number => {
  const xdiff = Math.abs(x1 - x2);
  const ydiff = Math.abs(y1 - y2);

  return Math.sqrt(xdiff**2 + ydiff**2);
};

export const getRandomInt = (min:number, max:number) : number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
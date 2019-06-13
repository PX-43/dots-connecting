import toMovable from './animate';
import createCircle from './circleFn';

toMovable(
    createCircle({position: {x: 100, y: 200}}),
).draw();


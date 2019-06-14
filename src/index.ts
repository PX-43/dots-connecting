import animate from './animate';
import createCircle from './circleFn';

animate(
    createCircle({position: {x: 100, y: 200}}),
).draw();


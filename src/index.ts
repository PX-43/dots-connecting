import Circle from './Circle';
import Canvas from './Canvas';

Canvas.background = '#3b3336';
Circle.create(100, 100, 34).setUpdateFn( c => {
  if(!Canvas.detectEdge(c)){
      c.x++;
      c.y++;
  }
});



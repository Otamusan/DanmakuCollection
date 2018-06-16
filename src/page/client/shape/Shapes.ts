import { Shape } from './Shape';
import { ShapeCircle } from './ShapeCircle';
import { ShapeSquare } from './ShapeSquare';
export namespace Shapes {
    export const CIRCLE: Shape = new ShapeCircle();
    export const SQUARE: Shape = new ShapeSquare();
}
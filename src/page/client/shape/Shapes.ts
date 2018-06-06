import { Shape } from "./Shape";
import { ShapeCircle } from "./ShapeCircle";
import { ShapeSquare } from './ShapeSquare';

export class Shapes {
    public static CIRCLE: Shape = new ShapeCircle();
    public static SQUARE: Shape = new ShapeSquare();
}
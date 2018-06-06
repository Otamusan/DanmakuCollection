import { Coord } from '../../util/Coord';
import { Color } from '../../util/Color';
export abstract class Shape {
    //描画時の処理
    public draw(coord: Coord, color: Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) { };
}
import { Shape } from './Shape';
import { Coord } from '../../common/Coord';
import { Color } from '../../common/Color';
export class ShapeCircle extends Shape {
    public draw(coord: Coord, color: Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = color.getString();
        ctx.globalAlpha = alpha;
        ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
        ctx.fill();
    }
}
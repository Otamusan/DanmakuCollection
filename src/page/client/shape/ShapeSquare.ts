import { Shape } from "./Shape";
import { Coord } from '../../util/Coord';
import { Color } from '../../util/Color';
import { CanvasUtil } from '../dom/CanvasUtil';

export class ShapeSquare extends Shape {
    public draw(coord: Coord, color: Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
        CanvasUtil.rotate(coord, radian, ctx, () => {
            ctx.beginPath()
            ctx.fillStyle = color.getString();
            ctx.globalAlpha = alpha;
            ctx.rect(coord.x - Math.sqrt(size) / 2, coord.y - Math.sqrt(size) / 2, Math.sqrt(size), Math.sqrt(size))
            ctx.fill();
        })
    }
}
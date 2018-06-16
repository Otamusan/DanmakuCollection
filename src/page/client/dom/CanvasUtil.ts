import { Coord } from '../../common/Coord';
export class CanvasUtil {
    public static rotate(coord: Coord, rad: number, ctx: CanvasRenderingContext2D, func: Function) {
        ctx.save();
        ctx.translate(coord.x, coord.y);
        ctx.rotate(rad);
        ctx.translate(-coord.x, -coord.y);
        func();
        ctx.restore();
    }
}
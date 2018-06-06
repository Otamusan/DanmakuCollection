import { Shape } from "./Shape";
import { CanvasUtil } from '../dom/CanvasUtil';
export class ShapeSquare extends Shape {
    draw(coord, color, size, radian, alpha, ctx) {
        CanvasUtil.rotate(coord, radian, ctx, () => {
            ctx.beginPath();
            ctx.fillStyle = color.getString();
            ctx.globalAlpha = alpha;
            ctx.rect(coord.x - Math.sqrt(size) / 2, coord.y - Math.sqrt(size) / 2, Math.sqrt(size), Math.sqrt(size));
            ctx.fill();
        });
    }
}
//# sourceMappingURL=ShapeSquare.js.map
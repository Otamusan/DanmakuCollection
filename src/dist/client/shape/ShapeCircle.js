import { Shape } from "./Shape";
export class ShapeCircle extends Shape {
    draw(coord, color, size, radian, alpha, ctx) {
        ctx.beginPath();
        ctx.fillStyle = color.getString();
        ctx.globalAlpha = alpha;
        ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
        ctx.fill();
    }
}
//# sourceMappingURL=ShapeCircle.js.map
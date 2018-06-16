"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const CanvasUtil_1 = require("../dom/CanvasUtil");
class ShapeSquare extends Shape_1.Shape {
    draw(coord, color, size, radian, alpha, ctx) {
        CanvasUtil_1.CanvasUtil.rotate(coord, radian, ctx, () => {
            ctx.beginPath();
            ctx.fillStyle = color.getString();
            ctx.globalAlpha = alpha;
            ctx.rect(coord.x - Math.sqrt(size) / 2, coord.y - Math.sqrt(size) / 2, Math.sqrt(size), Math.sqrt(size));
            ctx.fill();
        });
    }
}
exports.ShapeSquare = ShapeSquare;
//# sourceMappingURL=ShapeSquare.js.map
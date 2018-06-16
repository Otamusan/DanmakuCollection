"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class ShapeCircle extends Shape_1.Shape {
    draw(coord, color, size, radian, alpha, ctx) {
        ctx.beginPath();
        ctx.fillStyle = color.getString();
        ctx.globalAlpha = alpha;
        ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
        ctx.fill();
    }
}
exports.ShapeCircle = ShapeCircle;
//# sourceMappingURL=ShapeCircle.js.map
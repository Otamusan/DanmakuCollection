"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasUtil {
    static rotate(coord, rad, ctx, func) {
        ctx.save();
        ctx.translate(coord.x, coord.y);
        ctx.rotate(rad);
        ctx.translate(-coord.x, -coord.y);
        func();
        ctx.restore();
    }
}
exports.CanvasUtil = CanvasUtil;
//# sourceMappingURL=CanvasUtil.js.map
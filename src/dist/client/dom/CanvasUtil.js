export class CanvasUtil {
    static rotate(coord, rad, ctx, func) {
        ctx.save();
        ctx.translate(coord.x, coord.y);
        ctx.rotate(rad);
        ctx.translate(-coord.x, -coord.y);
        func();
        ctx.restore();
    }
}
//# sourceMappingURL=CanvasUtil.js.map
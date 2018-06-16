"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFunc_1 = require("./PFunc");
class PFuncFade extends PFunc_1.PFunc {
    onUpdate(particle) {
        let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));
        particle.setAlpha(newalpha);
    }
}
exports.PFuncFade = PFuncFade;
//# sourceMappingURL=PFuncFade.js.map
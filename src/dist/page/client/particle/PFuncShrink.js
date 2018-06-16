"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFunc_1 = require("./PFunc");
class PFuncShrink extends PFunc_1.PFunc {
    onUpdate(particle) {
        let newsize = particle.getSize() - (particle.getSize() / (particle.getRemain() - particle.getTime()));
        particle.setSize(newsize);
    }
}
exports.PFuncShrink = PFuncShrink;
//# sourceMappingURL=PFuncShrink.js.map
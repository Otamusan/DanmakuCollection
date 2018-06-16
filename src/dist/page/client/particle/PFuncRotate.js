"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFunc_1 = require("./PFunc");
class PFuncRotate extends PFunc_1.PFunc {
    constructor(subFuncList, acc) {
        super(subFuncList);
        this.acc = acc;
    }
    onUpdate(particle) {
        particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
    }
}
exports.PFuncRotate = PFuncRotate;
//# sourceMappingURL=PFuncRotate.js.map
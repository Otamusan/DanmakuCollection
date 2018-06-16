"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFunc_1 = require("./PFunc");
class PFuncGravity extends PFunc_1.PFunc {
    constructor(subFuncList, acc) {
        super(subFuncList);
        this.acc = acc;
    }
    onUpdate(particle) {
        particle.getVector().addDown(this.acc);
    }
}
exports.PFuncGravity = PFuncGravity;
//# sourceMappingURL=PFuncGravity.js.map
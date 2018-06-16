"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PFunc {
    constructor(subFuncList) {
        this.subFuncList = subFuncList;
    }
    onSystemUpdate(particle) {
        if (this.subFuncList != null) {
            this.subFuncList.forEach(Pfunc => {
                Pfunc.onSystemUpdate(particle);
            });
        }
        this.onUpdate(particle);
    }
    onUpdate(particle) {
    }
}
exports.PFunc = PFunc;
//# sourceMappingURL=PFunc.js.map
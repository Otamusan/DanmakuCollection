"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFunc_1 = require("./PFunc");
const Coord_1 = require("../../common/Coord");
class PFuncAccelerate extends PFunc_1.PFunc {
    constructor(subFuncList, acc) {
        super(subFuncList);
        this.acc = acc;
    }
    onUpdate(particle) {
        let newvector = new Coord_1.Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
        particle.setVector(newvector);
    }
}
exports.PFuncAccelerate = PFuncAccelerate;
//# sourceMappingURL=PFuncAccelerate.js.map
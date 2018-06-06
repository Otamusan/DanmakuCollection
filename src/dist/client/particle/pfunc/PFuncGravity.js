import { PFunc } from './PFunc';
export class PFuncGravity extends PFunc {
    constructor(acc) {
        super();
        this.acc = acc;
    }
    onUpdate(particle) {
        particle.getVector().addDown(this.acc);
    }
}
//# sourceMappingURL=PFuncGravity.js.map
import { PFunc } from './PFunc';
export class PFuncRotate extends PFunc {
    constructor(acc) {
        super();
        this.acc = acc;
    }
    onUpdate(particle) {
        particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
    }
}
//# sourceMappingURL=PFuncRotate.js.map
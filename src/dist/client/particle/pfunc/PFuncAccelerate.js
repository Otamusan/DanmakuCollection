import { PFunc } from './PFunc';
import { Coord } from '../../../util/Coord';
export class PFuncAccelerate extends PFunc {
    constructor(acc) {
        super();
        this.acc = acc;
    }
    onUpdate(particle) {
        let newvector = new Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
        particle.setVector(newvector);
    }
}
//# sourceMappingURL=PFuncAccelerate.js.map
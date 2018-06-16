import { PFunc } from './PFunc';
import { Particle } from './Particle';
export class PFuncGravity extends PFunc {
    private acc: number
    constructor(subFuncList: Array<PFunc>, acc: number) {
        super(subFuncList);
        this.acc = acc;
    }
    onUpdate(particle: Particle) {
        particle.getVector().addDown(this.acc);
    }
}
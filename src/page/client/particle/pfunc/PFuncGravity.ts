import { PFunc } from './PFunc';
import { Particle } from '../Particle';
export class PFuncGravity extends PFunc {
    private acc: number
    constructor(acc: number) {
        super();
        this.acc = acc;
    }
    onUpdate(particle: Particle) {
        particle.getVector().addDown(this.acc);
    }
}
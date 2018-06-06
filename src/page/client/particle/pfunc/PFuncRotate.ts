import { PFunc } from './PFunc';
import { Particle } from '../Particle';
export class PFuncRotate extends PFunc {
    private acc: number
    constructor(acc: number) {
        super();
        this.acc = acc;
    }
    onUpdate(particle: Particle) {
        particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
    }
}
import { PFunc } from './PFunc';
import { Particle } from '../Particle';
import { Coord } from '../../../util/Coord';
export class PFuncAccelerate extends PFunc {
    private acc: number
    constructor(acc: number) {
        super();
        this.acc = acc;
    }
    public onUpdate(particle: Particle) {
        let newvector = new Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
        particle.setVector(newvector);
    }
}
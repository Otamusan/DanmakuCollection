import { PFunc } from './PFunc';
import { Particle } from './Particle';
import { Coord } from '../../common/Coord';
export class PFuncAccelerate extends PFunc {
    private acc: number
    constructor(subFuncList: Array<PFunc>, acc: number) {
        super(subFuncList);
        this.acc = acc;
    }
    public onUpdate(particle: Particle) {
        let newvector = new Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
        particle.setVector(newvector);
    }
}
import { PFunc } from './PFunc';
import { Particle } from '../Particle';
export class PFuncShrink extends PFunc {
    onUpdate(particle: Particle) {
        let newsize = particle.getSize() - (particle.getSize() / (particle.getRemain() - particle.getTime()));
        particle.setSize(newsize)
    }
}
import { PFunc } from './PFunc';
import { Particle } from '../Particle';
export class PFuncFade extends PFunc {
    onUpdate(particle: Particle) {
        //let newalpha = 1-particle.getTime()/particle.getRemain();
        let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));

        particle.setAlpha(newalpha);
    }
}
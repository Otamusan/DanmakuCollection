import { PFunc } from './PFunc';
export class PFuncFade extends PFunc {
    onUpdate(particle) {
        //let newalpha = 1-particle.getTime()/particle.getRemain();
        let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));
        particle.setAlpha(newalpha);
    }
}
//# sourceMappingURL=PFuncFade.js.map
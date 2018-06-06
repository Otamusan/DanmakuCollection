import { PFunc } from './PFunc';
export class PFuncShrink extends PFunc {
    onUpdate(particle) {
        let newsize = particle.getSize() - (particle.getSize() / (particle.getRemain() - particle.getTime()));
        particle.setSize(newsize);
    }
}
//# sourceMappingURL=PFuncShrink.js.map
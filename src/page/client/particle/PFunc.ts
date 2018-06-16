import { Particle } from './Particle';
export class PFunc {
    private subFuncList: Array<PFunc>
    constructor(subFuncList: Array<PFunc>) {
        this.subFuncList = subFuncList;
    }
    public onSystemUpdate(particle: Particle) {
        if (this.subFuncList != null) {
            this.subFuncList.forEach(Pfunc => {
                Pfunc.onSystemUpdate(particle);
            });
        }

        this.onUpdate(particle);
    }
    public onUpdate(particle: Particle) {
    }
}
import { Particle } from './Particle';
export class ParticleManager {
    private particleList: Array<Particle>;
    private ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this.particleList = new Array<Particle>();
        this.ctx = ctx;
    }

    public onUpdate() {
        this.particleList.forEach((particle: Particle, index: number) => {
            particle.onUpdate();
            if (particle.isParticleDead()) {
                this.particleList.splice(index, 1);
            }
        });
    }

    public onDrawUpdate() {
        this.particleList.forEach((particle: Particle, index: number) => {
            particle.getShape().draw(particle.getCoord(), particle.getColor(), particle.getSize(), particle.getRad(), particle.getAlpha(), this.ctx);
        });
    }

    public spawnParticle(particle: Particle) {
        this.particleList.push(particle);
    }
}
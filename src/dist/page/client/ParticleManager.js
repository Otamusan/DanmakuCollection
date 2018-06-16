"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParticleManager {
    constructor(ctx) {
        this.particleList = new Array();
        this.ctx = ctx;
    }
    onUpdate() {
        this.particleList.forEach((particle, index) => {
            particle.onUpdate();
            if (particle.isParticleDead()) {
                this.particleList.splice(index, 1);
            }
        });
    }
    onDrawUpdate() {
        this.particleList.forEach((particle, index) => {
            particle.getShape().draw(particle.getCoord(), particle.getColor(), particle.getSize(), particle.getRad(), particle.getAlpha(), this.ctx);
        });
    }
    spawnParticle(particle) {
        this.particleList.push(particle);
    }
}
exports.ParticleManager = ParticleManager;
//# sourceMappingURL=ParticleManager.js.map
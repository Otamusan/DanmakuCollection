import { Scene } from './Scene';
import { ParticleManager } from '../particle/ParticleManager';
import { DOMHandler } from '../dom/DOMHandler';
import { Particle } from '../particle/Particle';
import { Color } from '../../util/Color';
import { Coord } from '../../util/Coord';
import { PFuncs } from '../particle/pfunc/PFuncs';
import { PFuncRotate } from '../particle/pfunc/PFuncRotate';
import { Shapes } from '../shape/Shapes';
export class SceneGame extends Scene {
    constructor(client, div) {
        super(client, div);
    }
    initCanvas() {
        this.canvas = DOMHandler.getElementByID(document, "canvas");
        this.canvas.width = this.client.width;
        this.canvas.height = this.client.height;
        this.ctx = this.canvas.getContext("2d");
        this.particleManager = new ParticleManager(this.ctx);
    }
    onTransitionedParentScene(scene) {
        this.initCanvas();
    }
    onUpdate() {
        this.particleManager.onUpdate();
        let particle = new Particle(new Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random()), Coord.createFromRadian(Math.random() * 2 * Math.PI, 4), this.getMouse().getCoord().copy(), 10000 * Math.random(), 100, [PFuncs.GRAVITY, PFuncs.SHRINK, PFuncs.FADE, new PFuncRotate(Math.random()), PFuncs.DECELERATION1_1], Shapes.SQUARE, Math.random() * 2 * Math.PI, 0.5);
        this.particleManager.spawnParticle(particle);
    }
    onDrawUpdate() {
        this.DrawBackGround(new Color(0, 0, 0));
        this.particleManager.onDrawUpdate();
    }
    DrawBackGround(color) {
        this.ctx.fillStyle = color.getString();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//# sourceMappingURL=SceneGame.js.map
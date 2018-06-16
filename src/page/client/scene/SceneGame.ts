import { Scene } from './Scene';
import { ParticleManager } from '../ParticleManager';
import { Client } from '../Client';
import { DOMHandler } from '../dom/DOMHandler';
import { StateTree } from '../../common/StateTree';
import { Particle } from '../particle/Particle';
import { Color } from '../../common/Color';
import { PFunc } from '../particle/PFunc';
import { PFuncs } from '../particle/PFuncs';
import { Shapes } from '../shape/Shapes';
export class SceneGame extends Scene {
    public canvas: HTMLCanvasElement;
    public particleManager: ParticleManager;
    public ctx: CanvasRenderingContext2D;
    constructor(client: Client, div: HTMLDivElement) {
        super(client, div);
    }
    public initCanvas() {
        this.canvas = DOMHandler.getElementByID<HTMLCanvasElement>(document, "canvas");
        this.canvas.width = this.client.width;
        this.canvas.height = this.client.height;
        this.ctx = this.canvas.getContext("2d");
        this.particleManager = new ParticleManager(this.ctx)
    }

    public onTransitionedParentState(parentState: StateTree) {
        this.initCanvas();
    }

    public onUpdate() {
        this.particleManager.onUpdate();
        for (let i = 0; i < 1; i++) {
            let particle = new Particle(
                Color.createFromHSV(80 + Math.random() * 40 - 20, 1, 1),
                this.getMouse().getCoord().copy().subtractCoord(this.getMouse().getPreviousCoord().copy()).multiplyCoord(Math.random() / 10),
                this.getMouse().getCoord().copy(),
                100 * Math.random(),
                100,
                new PFunc([PFuncs.FADE, PFuncs.SHRINK, PFuncs.DECELERATION1_1]),
                Shapes.SQUARE,
                Math.random() * 2 * Math.PI,
                0.5);
            this.particleManager.spawnParticle(particle);
        }


    }

    public sendInfoToServer() {

    }

    public onDrawUpdate() {
        this.DrawBackGround(new Color(0, 0, 0));
        this.particleManager.onDrawUpdate();
    }

    public DrawBackGround(color: Color) {
        this.ctx.fillStyle = color.getString();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
import { Scene } from './Scene';
import { ParticleManager } from '../particle/ParticleManager';
import { Client } from '../Client';
import { DOMHandler } from '../dom/DOMHandler';
import { Particle } from '../particle/Particle';
import { Color } from '../../util/Color';
import { Coord } from '../../util/Coord';
import { PFuncs } from '../particle/pfunc/PFuncs';
import { PFuncRotate } from '../particle/pfunc/PFuncRotate';
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

    public onTransitionedParentScene(scene: Scene) {
        this.initCanvas();
    }

    public onUpdate() {
        this.particleManager.onUpdate();
        let particle = new Particle(
            new Color(255*Math.random(), 255*Math.random(), 255*Math.random()),
            Coord.createFromRadian(Math.random()*2*Math.PI, 4),
            this.getMouse().getCoord().copy(),
            10000*Math.random(),
            100,
            [PFuncs.GRAVITY, PFuncs.SHRINK, PFuncs.FADE, new PFuncRotate(Math.random()), PFuncs.DECELERATION1_1],
            Shapes.SQUARE,
            Math.random()*2*Math.PI,
            0.5);
        this.particleManager.spawnParticle(particle);
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
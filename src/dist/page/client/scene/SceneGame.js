"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("./Scene");
const ParticleManager_1 = require("../ParticleManager");
const DOMHandler_1 = require("../dom/DOMHandler");
const Particle_1 = require("../particle/Particle");
const Color_1 = require("../../common/Color");
const PFunc_1 = require("../particle/PFunc");
const PFuncs_1 = require("../particle/PFuncs");
const Shapes_1 = require("../shape/Shapes");
const ClientData_1 = require("../../common/ClientData");
const EntityPlayer_1 = require("../../server/entity/EntityPlayer");
const EntityBullet_1 = require("../../server/entity/bullet/EntityBullet");
const BulletState_1 = require("../../server/entity/bullet/BulletState");
class SceneGame extends Scene_1.Scene {
    constructor(client, div, ws) {
        super(client, div);
        this.data = new ClientData_1.ClientData("test");
        this.player = this.client.internalServer.login(this.data);
    }
    initCanvas() {
        this.canvas = DOMHandler_1.DOMHandler.getElementByID(this.sceneDiv, "canvas");
        this.canvas.width = this.client.width;
        this.canvas.height = this.client.height;
        this.ctx = this.canvas.getContext("2d");
        this.particleManager = new ParticleManager_1.ParticleManager(this.ctx);
    }
    onTransitionedParentState(parentState) {
        this.initCanvas();
    }
    syncServer() {
        this.serverField = this.player.field;
        this.player.controller = this.client.controller;
    }
    onUpdate() {
        this.syncServer();
        this.particleManager.onUpdate();
        for (let i = 0; i < 1; i++) {
            let particle = new Particle_1.Particle(Color_1.Color.createFromHSV(80 + Math.random() * 40 - 20, 1, 1), this.getMouse().getCoord().copy().subtractCoord(this.getMouse().getPreviousCoord().copy()).multiply(Math.random() / 10), this.getMouse().getCoord().copy(), 100 * Math.random(), 20, new PFunc_1.PFunc([PFuncs_1.PFuncs.FADE, PFuncs_1.PFuncs.SHRINK, PFuncs_1.PFuncs.DECELERATION1_1]), Shapes_1.Shapes.SQUARE, Math.random() * 2 * Math.PI, 0.5);
            this.particleManager.spawnParticle(particle);
        }
    }
    onDrawUpdate() {
        this.DrawBackGround(new Color_1.Color(0, 0, 0));
        this.particleManager.onDrawUpdate();
        this.drawEntities(this.serverField.getEntityManager().getEntityList());
    }
    drawEntities(list) {
        list.forEach(entity => {
            if (entity instanceof EntityPlayer_1.EntityPlayer) {
                Shapes_1.Shapes.CIRCLE.draw(entity.coord, new Color_1.Color(256, 256, 256), entity.getMaxHP(), 0, 1, this.ctx);
            }
            else if (entity instanceof EntityBullet_1.EntityBullet) {
                if (entity.state != BulletState_1.BulletState.FADE) {
                    Shapes_1.Shapes.CIRCLE.draw(entity.coord, new Color_1.Color(0, 256, 256), entity.getHP(), 0, 1, this.ctx);
                }
                else {
                    Shapes_1.Shapes.CIRCLE.draw(entity.coord, new Color_1.Color(0, 256, 256), entity.getHP(), 0, entity.hp / entity.maxHp, this.ctx);
                }
            }
        });
    }
    DrawBackGround(color) {
        this.ctx.fillStyle = color.getString();
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
exports.SceneGame = SceneGame;
//# sourceMappingURL=SceneGame.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
const EntityBullet_1 = require("./bullet/EntityBullet");
const PhysicsHelper_1 = require("./PhysicsHelper");
class EntityPlayer extends EntityLiving_1.EntityLiving {
    constructor(field, player, maxHp) {
        super(field, maxHp);
        this.physics = new PhysicsHelper_1.PhysicsHelper();
        this.player = player;
        this.physics.weight = this.maxHp / 10;
        this.physics.speedLimit = 0;
        this.maxForce = 100;
        this.physics.k = 0.1;
    }
    getPointerCoord() {
        return this.player.controller.getMouseState().getCoord();
    }
    isPlayerClicked(n) {
        return this.player.controller.getMouseState().isMousePressed(n);
    }
    onUpdate() {
        super.onUpdate();
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
        let mouse = this.getPointerCoord();
        if (this.isPlayerClicked(0)) {
            let bullet = new EntityBullet_1.EntityBullet(this.field, 200);
            //bullet.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()).getUnitVector().multiply(20));
            bullet.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(20));
            bullet.coord = this.coord.copy();
            bullet.physics.speed = this.physics.speed.copy();
            this.field.spawnEntity(bullet);
        }
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxForce) {
            this.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()));
        }
        else {
            this.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxForce));
        }
    }
}
exports.EntityPlayer = EntityPlayer;
//# sourceMappingURL=EntityPlayer.js.map
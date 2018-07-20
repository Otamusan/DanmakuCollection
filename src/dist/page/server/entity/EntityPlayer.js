"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
const EntityBullet_1 = require("./bullet/EntityBullet");
const PhysicsHelper_1 = require("./PhysicsHelper");
const Bullet_1 = require("./bullet/Bullet");
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
            let bullet = new EntityBullet_1.EntityBullet(this.field, new Bullet_1.Bullet(10, 100, 5));
            bullet.physics.speed.addCoord(mouse.copy().subtractCoord(this.coord.copy()).setLength(bullet.bullet.getSpeed()));
            bullet.coord = this.coord.copy();
            bullet.physics.speed.addCoord(this.physics.speed.copy());
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
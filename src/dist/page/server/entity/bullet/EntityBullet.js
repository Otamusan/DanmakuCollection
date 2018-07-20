"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("../EntityLiving");
const PhysicsHelper_1 = require("../PhysicsHelper");
const BulletState_1 = require("./BulletState");
class EntityBullet extends EntityLiving_1.EntityLiving {
    constructor(field, bullet) {
        super(field, bullet.getMaxHP());
        this.bullet = bullet;
        this.physics = new PhysicsHelper_1.PhysicsHelper();
        this.time = 0;
        this.fadeHPRate = 0.4;
        this.fadeSpeedRate = 0.5;
        this.physics.k = 0;
        this.physics.setSpeed(this.bullet.getSpeed());
    }
    onUpdate() {
        super.onUpdate();
        this.time++;
        if (this.time >= this.bullet.getMaxTime()) {
            this.state = BulletState_1.BulletState.FADE;
        }
        if (this.state == BulletState_1.BulletState.FADE) {
            this.hp -= this.hp * this.fadeHPRate;
            this.physics.speed.multiply(this.fadeSpeedRate);
        }
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
    }
    onSpawned() {
        this.state = BulletState_1.BulletState.NORMAL;
    }
}
exports.EntityBullet = EntityBullet;
//# sourceMappingURL=EntityBullet.js.map
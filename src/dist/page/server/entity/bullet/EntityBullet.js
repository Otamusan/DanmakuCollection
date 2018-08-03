"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("../EntityLiving");
const PhysicsHelper_1 = require("../PhysicsHelper");
const BulletState_1 = require("./BulletState");
class EntityBullet extends EntityLiving_1.EntityLiving {
    constructor(entityManager, bullet) {
        super(entityManager, bullet.getMaxHP());
        this.bullet = bullet;
        this.physics = new PhysicsHelper_1.PhysicsHelper();
        this.time = 0;
        this.fadeHPRate = 0.2;
        this.fadeSpeedRate = 0.2;
        this.physics.k = 0;
    }
    onUpdate() {
        super.onUpdate();
        this.time++;
        if (this.time >= this.bullet.getMaxTime()) {
            this.state = BulletState_1.BulletState.FADE;
        }
        if (this.state == BulletState_1.BulletState.FADE) {
            this.hp -= this.maxHp * this.fadeHPRate;
            this.physics.speed.setLength(this.physics.speed.getLength() - this.bullet.getSpeed() * this.fadeSpeedRate);
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
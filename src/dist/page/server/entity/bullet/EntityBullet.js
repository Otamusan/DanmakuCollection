"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("../EntityLiving");
const PhysicsHelper_1 = require("../PhysicsHelper");
const EnumBulletState_1 = require("./EnumBulletState");
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
        if (this.state == EnumBulletState_1.EnumBulletState.NORMAL && this.time >= this.bullet.getMaxTime()) {
            this.state = EnumBulletState_1.EnumBulletState.FADE;
        }
        if (this.state == EnumBulletState_1.EnumBulletState.FADE) {
            this.hp -= this.maxHp * this.fadeHPRate;
            this.physics.speed.setLength(this.physics.speed.getLength() - this.bullet.getSpeed() * this.fadeSpeedRate);
        }
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
    }
    onSpawned() {
        this.state = EnumBulletState_1.EnumBulletState.NORMAL;
    }
}
exports.EntityBullet = EntityBullet;
//# sourceMappingURL=EntityBullet.js.map
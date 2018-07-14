"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
const PhysicsHelper_1 = require("./PhysicsHelper");
class EntityBullet extends EntityLiving_1.EntityLiving {
    constructor(field, maxhp) {
        super(field, maxhp);
        this.physics = new PhysicsHelper_1.PhysicsHelper();
        this.power = 10;
    }
    onUpdate() {
        super.onUpdate();
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
        this.power -= 1;
        if (this.power <= 0) {
            this.setDead();
        }
    }
}
exports.EntityBullet = EntityBullet;
//# sourceMappingURL=EntityBullet.js.map
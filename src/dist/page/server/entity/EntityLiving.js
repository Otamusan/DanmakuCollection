"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class EntityLiving extends Entity_1.Entity {
    constructor(entityManager, maxHp) {
        super(entityManager);
        this.maxHp = maxHp;
        this.hp = maxHp;
    }
    onUpdate() {
        if (this.hp <= 0) {
            this.setDead();
        }
        super.onUpdate();
    }
    addDamaged(n) {
        this.hp -= n;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }
    getHP() {
        return this.hp;
    }
    getMaxHP() {
        return this.maxHp;
    }
}
exports.EntityLiving = EntityLiving;
//# sourceMappingURL=EntityLiving.js.map
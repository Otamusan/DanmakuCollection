"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class EntityLiving extends Entity_1.Entity {
    constructor(field, maxHp) {
        super(field);
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.weight = this.maxHp / 10;
    }
    onUpdate() {
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
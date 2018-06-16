"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class EntityLiving extends Entity_1.Entity {
    constructor(maxHp) {
        super();
        this.maxHp = maxHp;
        this.hp = maxHp;
    }
    onUpdate() {
        this.coord.addCoord(this.vector.copy());
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
    getVector() {
        return this.coord;
    }
}
exports.EntityLiving = EntityLiving;
//# sourceMappingURL=EntityLiving.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
class EntityBullet extends EntityLiving_1.EntityLiving {
    constructor(field, maxhp) {
        super(field, maxhp);
    }
    onUpdate() {
        super.onUpdate();
        this.hp--;
    }
}
exports.EntityBullet = EntityBullet;
//# sourceMappingURL=EntityBullet.js.map
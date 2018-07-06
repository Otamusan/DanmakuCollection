"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
const EntityBullet_1 = require("./EntityBullet");
class EntityPlayer extends EntityLiving_1.EntityLiving {
    constructor(field, player, maxHp) {
        super(field, maxHp);
        this.player = player;
        this.weight = this.maxHp / 10;
        this.speedLimit = 0;
        this.maxForce = 100;
        this.k = 0.1;
    }
    getPointerCoord() {
        return this.player.controller.getMouseState().getCoord();
    }
    isPlayerClicked(n) {
        return this.player.controller.getMouseState().isMousePressed(n);
    }
    onUpdate() {
        super.onUpdate();
        let mouse = this.getPointerCoord();
        if (this.isPlayerClicked(0)) {
            let bullet = new EntityBullet_1.EntityBullet(this.field, 200);
            bullet.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(5));
            bullet.coord = this.coord.copy();
            this.field.spawnEntity(bullet);
        }
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxForce) {
            this.addForce(mouse.copy().subtractCoord(this.coord.copy()));
        }
        else {
            this.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxForce));
        }
    }
}
exports.EntityPlayer = EntityPlayer;
//# sourceMappingURL=EntityPlayer.js.map
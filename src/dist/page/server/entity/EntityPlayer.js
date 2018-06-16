"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
class EntityPlayer extends EntityLiving_1.EntityLiving {
    constructor(player, maxHp) {
        super(maxHp);
        this.player = player;
    }
    getPointerCoord() {
        return this.player.controller.getMouseState().getCoord();
    }
    isPlayerClicked(n) {
        return this.player.controller.getMouseState().isMousePressed(n);
    }
    onUpdate() {
        let mouse = this.getPointerCoord();
        this.coord.addCoord(mouse.multiplyCoord(0.1));
    }
}
exports.EntityPlayer = EntityPlayer;
//# sourceMappingURL=EntityPlayer.js.map
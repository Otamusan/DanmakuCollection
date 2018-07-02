"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const EntityPlayer_1 = require("../entity/EntityPlayer");
class FieldGame extends Field_1.Field {
    constructor(parent) {
        super(parent);
        this.EntityList = new Array();
    }
    onPlayerLogined(player) {
        let entityPlayer = new EntityPlayer_1.EntityPlayer(player, 100);
        this.spawnEntity(entityPlayer);
    }
    spawnEntity(entity) {
        this.EntityList.push(entity);
    }
    onUpdate() {
        this.EntityList.forEach((entity, i) => {
            entity.onUpdate();
            if (entity.isDead) {
                this.EntityList[i] = null;
            }
        });
    }
}
exports.FieldGame = FieldGame;
//# sourceMappingURL=FieldGame.js.map
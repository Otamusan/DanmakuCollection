"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const EntityPlayer_1 = require("../entity/EntityPlayer");
class FieldGame extends Field_1.Field {
    onPlayerLogined(player) {
        let entityPlayer = new EntityPlayer_1.EntityPlayer(this, player, 1000);
        this.spawnEntity(entityPlayer);
    }
}
exports.FieldGame = FieldGame;
//# sourceMappingURL=FieldGame.js.map
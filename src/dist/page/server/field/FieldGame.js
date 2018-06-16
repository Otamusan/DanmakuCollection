"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
class FieldGame extends Field_1.Field {
    constructor(parent) {
        super(parent);
        this.EntityList = new Array();
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
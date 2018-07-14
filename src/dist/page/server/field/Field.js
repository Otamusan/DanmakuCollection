"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateTree_1 = require("../../common/StateTree");
class Field extends StateTree_1.StateTree {
    constructor(parent) {
        super(parent);
        this.playerList = new Array;
        this.EntityList = new Array();
    }
    onPlayerLogined(player) { }
    spawnEntity(entity) {
        this.EntityList.push(entity);
        entity.onSpawned();
    }
    onUpdate() {
        this.EntityList.forEach((entity, i) => {
            entity.onUpdate();
            if (entity.isDead) {
                //this.EntityList[i] = null;
                this.EntityList.splice(i, 1);
            }
        });
    }
    transitionSubState(subState) {
        if (!(subState instanceof Field))
            return;
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }
    canLogin(play) {
        return true;
    }
    addPlayer(player) {
        this.playerList.push(player);
        player.field = this;
        this.onPlayerLogined(player);
        console.log(player);
    }
}
exports.Field = Field;
//# sourceMappingURL=Field.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateTree_1 = require("../../common/StateTree");
class Field extends StateTree_1.StateTree {
    constructor(parent) {
        super(parent);
        this.playerList = new Array;
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
    onPlayerLogined(player) { }
    addPlayer(player) {
        this.playerList.push(player);
        player.field = this;
        this.onPlayerLogined(player);
    }
}
exports.Field = Field;
//# sourceMappingURL=Field.js.map
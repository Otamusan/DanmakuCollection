"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateTree_1 = require("../../common/StateTree");
const PlayerManager_1 = require("../PlayerManager");
class Field extends StateTree_1.StateTree {
    constructor(parent) {
        super(parent);
        this.playerManager = new PlayerManager_1.PlayerManager();
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
    Login(player) {
        this.playerManager.Login(player);
    }
}
exports.Field = Field;
//# sourceMappingURL=Field.js.map
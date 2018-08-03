"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateTree_1 = require("../../common/StateTree");
const EntityManager_1 = require("./EntityManager");
class Field extends StateTree_1.StateTree {
    constructor(parent) {
        super(parent);
        this.entityManager = new EntityManager_1.EntityManager();
        this.playerList = new Array;
    }
    getEntityManager() {
        return this.entityManager;
    }
    onPlayerLogined(player) { }
    onUpdate() {
        this.entityManager.onUpdate();
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
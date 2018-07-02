"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerManager {
    constructor(max) {
        this.max = max;
        this.playerList = new Array(max);
        //this.playerList.fill(null);
    }
    login(player) {
        this.playerList.push(player);
    }
    getPlayer(i) {
        return this.playerList[i];
    }
    logout(i) {
        this.playerList[i] = null;
    }
}
exports.PlayerManager = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map
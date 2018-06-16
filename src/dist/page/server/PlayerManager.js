"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerManager {
    constructor() {
        this.playerList = new Array();
    }
    Login(player) {
        this.playerList.push(player);
    }
}
exports.PlayerManager = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map
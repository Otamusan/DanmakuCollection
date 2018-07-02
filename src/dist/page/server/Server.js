"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const PlayerManager_1 = require("./PlayerManager");
class Server {
    constructor() {
        this.onUpdate = () => {
            this.fieldList.forEach(field => {
                field.onSystemUpdate();
            });
        };
        this.fieldList = new Array();
        this.playerManager = new PlayerManager_1.PlayerManager(100);
    }
    getPlayer(i) {
        return this.playerManager.getPlayer(i);
    }
    getAvailableField(player) {
        let field;
        this.fieldList.forEach(f => {
            if (f.canLogin(player)) {
                field = f;
            }
        });
        return field;
    }
    setField(field) {
        this.fieldList.push(field);
    }
    login(data) {
        let player = new Player_1.Player(data);
        let field = this.getAvailableField(player);
        this.playerManager.login(player);
        field.addPlayer(player);
        return player;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map
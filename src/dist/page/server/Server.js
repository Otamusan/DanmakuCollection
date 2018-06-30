"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class Server {
    constructor() {
        this.onUpdate = () => {
            this.fieldList.forEach(field => {
                field.onSystemUpdate();
            });
        };
        this.fieldList = new Array();
    }
    getNewID() {
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
    login(data) {
        let player = new Player_1.Player(0, data);
        let field = this.getAvailableField(player);
        field.Login(player);
        player.field = field;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map
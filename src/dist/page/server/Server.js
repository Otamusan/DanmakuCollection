"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    constructor() {
        this.onUpdate = () => {
            this.fieldList.forEach(field => {
                field.onSystemUpdate();
            });
        };
        this.fieldList = new Array();
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
    login(player) {
        let field = this.getAvailableField(player);
        field.Login(player);
        player.field = field;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map
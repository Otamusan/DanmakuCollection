"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("websocket");
const Http = require("http");
var WebSocketServer = WebSocket.server;
class Server {
    constructor() {
        this.onUpdate = () => {
            this.fieldList.forEach(field => {
                field.onSystemUpdate();
            });
            console.log(432423);
        };
        this.fieldList = new Array();
    }
    serverStart() {
        this.httpServer = Http.createServer((request, response) => {
            response.writeHead(404);
            response.end();
        });
        this.httpServer.listen(8080, function () {
        });
        this.wsServer = new WebSocketServer({
            httpServer: this.httpServer,
            autoAcceptConnections: false
        });
        this.wsServer.on('request', (request) => {
            var connection = request.accept('echo-protocol', request.origin);
            connection.on('message', function (message) {
                if (message.type === 'utf8') {
                    connection.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    connection.sendBytes(message.binaryData);
                }
            });
            connection.on('close', function (reasonCode, description) {
            });
        });
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
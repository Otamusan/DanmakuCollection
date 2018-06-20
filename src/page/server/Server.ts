import { Field } from "./field/Field";
import { Player } from "./Player";
import WebSocket = require("websocket");
import Http = require("http");
import WebSocketServer = WebSocket.server;

export class Server {
    public fieldList: Array<Field>
    public playerList: Array<Player>
    public httpServer : Http.Server;
    public wsServer: WebSocketServer;
    constructor() {
        this.fieldList = new Array<Field>()
    }

    public serverStart(){
        this.httpServer = Http.createServer((request, response)=>{
            response.writeHead(404);
            response.end();
        })
        this.httpServer.listen(8080, function() {
        });
        this.wsServer = new WebSocketServer({
            httpServer: this.httpServer,
            autoAcceptConnections: false
        });
        this.wsServer.on('request', (request) =>{
            var connection = request.accept('echo-protocol', request.origin);
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    connection.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    connection.sendBytes(message.binaryData);
                }
            });
            connection.on('close', function(reasonCode, description) {
            });
        });
    }

    public onUpdate = () => {
        this.fieldList.forEach(field => {
            field.onSystemUpdate();
        });
    }

    public getAvailableField(player: Player): Field {
        let field;
        this.fieldList.forEach(f => {
            if (f.canLogin(player)) {
                field = f;
            }
        });
        return field;
    }

    public login(player: Player) {
        let field = this.getAvailableField(player);
        field.Login(player);
        player.field = field;
    }
}

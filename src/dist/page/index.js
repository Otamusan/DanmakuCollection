"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./client/Client");
const SceneTitle_1 = require("./client/scene/SceneTitle");
const Server_1 = require("./server/Server");
var main;
(function (main) {
    const server = new Server_1.Server();
    const client = new Client_1.Client(document, 600, 800, server);
    const mainScene = new SceneTitle_1.SceneTitle(client, client.divManager.getDivCopy("title"));
    mainScene.appendSceneDiv();
    client.registerMainScene(mainScene);
    setInterval(client.onUpdate, 1000 / 60);
    setInterval(server.onUpdate, 1000 / 60);
})(main || (main = {}));
//# sourceMappingURL=index.js.map
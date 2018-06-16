"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./client/Client");
var main;
(function (main) {
    const client = new Client_1.Client.Client(document, 600, 800);
    const mainScene = new Client_1.Client.Scene.SceneTitle(client, client.divManager.getDivCopy("title"));
    client.registerMainScene(mainScene);
    mainScene.appendSceneDiv();
    setInterval(client.onUpdate, 1000 / 60);
})(main || (main = {}));
//# sourceMappingURL=index.js.map
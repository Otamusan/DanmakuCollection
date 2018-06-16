"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const Scene_1 = require("./scene/Scene");
const DivManager_1 = require("./DivManager");
class Client {
    constructor(document, height, width) {
        this.onUpdate = () => {
            this.controller.onUpdate();
            this.rootScene.onSystemUpdate();
        };
        this.document = document;
        this.controller = new Controller_1.Controller(this.document);
        this.divManager = new DivManager_1.DivManager(document);
        this.divManager.initDocument();
        this.rootScene = new Scene_1.Scene(this, null);
        this.document.body.style.margin = "0";
        this.document.body.style.overflow = "hidden";
        this.height = height;
        this.width = width;
    }
    registerMainScene(scene) {
        this.rootScene = scene;
    }
    getMainScene() {
        return this.rootScene;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map
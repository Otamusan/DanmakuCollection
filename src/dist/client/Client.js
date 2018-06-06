import { Controller } from './Controller';
import { Scene } from './scene/Scene';
import { DivManager } from './DivManager';
//クライアント系の処理を総括で管理
export class Client {
    constructor(document, height, width) {
        this.onUpdate = () => {
            this.controller.onUpdate();
            this.rootScene.onSystemUpdate();
        };
        this.document = document;
        this.controller = new Controller(this.document);
        this.divManager = new DivManager(document);
        this.divManager.initDocument();
        this.rootScene = new Scene(this, null);
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
//# sourceMappingURL=Client.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("./Scene");
const MouseState_1 = require("../MouseState");
const SceneConnect_1 = require("./SceneConnect");
class SceneTitle extends Scene_1.Scene {
    constructor(client, div) {
        super(client, div);
        this.connect = new SceneConnect_1.SceneConnect(client, client.divManager.getDivCopy("connect"));
    }
    onUpdate() {
        if (this.getMouse().isMousePressed(MouseState_1.MouseState.LEFT_BUTTON)) {
            this.transitionSubState(this.connect);
        }
    }
}
exports.SceneTitle = SceneTitle;
//# sourceMappingURL=SceneTitle.js.map
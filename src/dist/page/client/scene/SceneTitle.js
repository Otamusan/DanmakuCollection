"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("./Scene");
const SceneGame_1 = require("./SceneGame");
const MouseState_1 = require("../MouseState");
class SceneTitle extends Scene_1.Scene {
    constructor(client, div) {
        super(client, div);
        this.game = new SceneGame_1.SceneGame(client, client.divManager.getDivCopy("game"));
    }
    onUpdate() {
        if (this.getMouse().isMousePressed(MouseState_1.MouseState.LEFT_BUTTON)) {
            this.transitionSubState(this.game);
        }
    }
}
exports.SceneTitle = SceneTitle;
//# sourceMappingURL=SceneTitle.js.map
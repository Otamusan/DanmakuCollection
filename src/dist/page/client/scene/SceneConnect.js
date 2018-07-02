"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("./Scene");
const DOMHandler_1 = require("../dom/DOMHandler");
const SceneGame_1 = require("./SceneGame");
class SceneConnect extends Scene_1.Scene {
    constructor(client, div, parentScene) {
        super(client, div, parentScene);
        this.isButtonPushed = () => {
            let address = this.getAddress();
            this.ws = new WebSocket(address, ['soap', 'xmpp']);
            this.ws.onopen = () => {
                this.game = new SceneGame_1.SceneGame(this.client, this.client.divManager.getDivCopy("game"), this.ws);
                this.transitionSubState(this.game);
            };
        };
        this.textbox = DOMHandler_1.DOMHandler.getElementByID(this.sceneDiv, "address");
        this.local = DOMHandler_1.DOMHandler.getElementByID(this.sceneDiv, "local");
        this.decision = DOMHandler_1.DOMHandler.getElementByID(this.sceneDiv, "decision");
        this.state = DOMHandler_1.DOMHandler.getElementByID(this.sceneDiv, "state");
        this.decision.onclick = this.isButtonPushed;
        this.local.onclick = () => {
            this.game = new SceneGame_1.SceneGame(this.client, this.client.divManager.getDivCopy("game"));
            this.transitionSubState(this.game);
        };
    }
    getAddress() {
        return this.textbox.value;
    }
    onUpdate() {
        super.onUpdate();
        if (this.ws != null) {
            switch (this.ws.readyState) {
                case (WebSocket.CONNECTING): {
                    this.state.innerHTML = "接続中";
                    break;
                }
                case (WebSocket.OPEN): {
                    this.state.innerHTML = "接続完了。準備中";
                    break;
                }
                case (WebSocket.CLOSED): {
                    this.state.innerHTML = "接続が閉じています";
                    break;
                }
            }
        }
        else {
            this.state.innerHTML = "接続してください";
        }
    }
}
exports.SceneConnect = SceneConnect;
//# sourceMappingURL=SceneConnect.js.map
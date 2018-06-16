"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateTree_1 = require("../../common/StateTree");
const DOMHandler_1 = require("../dom/DOMHandler");
//タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
class Scene extends StateTree_1.StateTree {
    constructor(client, div, parentScene) {
        super(parentScene);
        this.client = client;
        if (div == undefined) {
            this.sceneDiv = DOMHandler_1.DOMHandler.createElementByJS("div", null);
        }
        else {
            this.sceneDiv = div;
        }
        this.sceneDiv.style.margin = "0";
        this.sceneDiv.style.height = client.height + "";
        this.sceneDiv.style.width = client.width + "";
    }
    onSystemUpdate() {
        super.onSystemUpdate();
        this.onDrawUpdate();
    }
    onUpdate() {
    }
    //描画用
    onDrawUpdate() {
    }
    getMouse() {
        return this.client.controller.getMouseState();
    }
    getKey() {
        return this.client.controller.getKeyState();
    }
    //このシーン用のdiv要素を外す
    removeSceneDiv() {
        this.client.document.body.removeChild(this.sceneDiv);
    }
    //このシーン用のdiv要素を付ける
    appendSceneDiv() {
        this.client.document.body.appendChild(this.sceneDiv);
    }
    //子シーンへ移行
    transitionSubState(subState) {
        if (!(subState instanceof Scene))
            return;
        this.currentSubState = subState;
        this.removeSceneDiv();
        subState.appendSceneDiv();
        this.currentSubState.onTransitionedParentState(this);
    }
    //親シーンから移行されたときに呼び出される
    onTransitionedParentState(parentState) {
    }
    //親シーンへ戻る
    returnParentState() {
        this.parentState.currentSubState = null;
        this.removeSceneDiv();
        this.parentState.appendSceneDiv();
        this.parentState.onReturnedFromSubState(this);
    }
    //子シーンから戻ってきたときに呼び出される
    onReturnedFromSubState(subState) {
    }
}
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map
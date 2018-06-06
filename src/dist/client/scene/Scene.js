import { DOMHandler } from '../dom/DOMHandler';
export class Scene {
    constructor(client, div, parentScene) {
        this.client = client;
        this.currentSubScene = null;
        if (parentScene == undefined) {
            this.parentScene = null;
        }
        else {
            this.parentScene = parentScene;
        }
        if (div == undefined) {
            this.sceneDiv = DOMHandler.createElementByJS("div", null);
        }
        else {
            this.sceneDiv = div;
        }
        this.sceneDiv.style.margin = "0";
        this.sceneDiv.style.height = client.height + "";
        this.sceneDiv.style.width = client.width + "";
    }
    onSystemUpdate() {
        if (this.currentSubScene != null) {
            this.currentSubScene.onSystemUpdate();
            return;
        }
        this.onUpdate();
        this.onDrawUpdate();
    }
    //ロジック用
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
    transitionSubScene(subScene) {
        this.currentSubScene = subScene;
        this.removeSceneDiv();
        subScene.appendSceneDiv();
        this.currentSubScene.onTransitionedParentScene(this);
    }
    //親シーンから移行されたときに呼び出される
    onTransitionedParentScene(parentScene) {
    }
    //親シーンへ戻る
    returnParentScene() {
        this.parentScene.currentSubScene = null;
        this.removeSceneDiv();
        this.parentScene.appendSceneDiv();
        this.parentScene.onReturnedFromSubScene(this);
    }
    //子シーンから戻ってきたときに呼び出される
    onReturnedFromSubScene(subScene) {
    }
}
//# sourceMappingURL=Scene.js.map
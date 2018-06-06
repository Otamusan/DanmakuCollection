import { Client } from '../Client';
import { DOMHandler } from '../dom/DOMHandler';
import { MouseState } from '../MouseState';
import { KeyState } from '../KeyState';
export class Scene {
    public client: Client;
    private parentScene: Scene;
    protected currentSubScene: Scene;
    protected sceneDiv: HTMLDivElement;
    constructor(client: Client, div: HTMLDivElement, parentScene?: Scene) {
        this.client = client;
        this.currentSubScene = null
        if (parentScene == undefined) {
            this.parentScene = null;
        } else {
            this.parentScene = parentScene;
        }
        if (div == undefined) {
            this.sceneDiv = DOMHandler.createElementByJS<HTMLDivElement>("div", null);
        } else {
            this.sceneDiv = div;
        }
        this.sceneDiv.style.margin = "0";
        this.sceneDiv.style.height = client.height + "";
        this.sceneDiv.style.width = client.width + "";
    }

    public onSystemUpdate() {
        if (this.currentSubScene != null) {
            this.currentSubScene.onSystemUpdate();
            return;
        }
        this.onUpdate();
        this.onDrawUpdate();
    }

    //ロジック用
    public onUpdate() {

    }
    //描画用
    public onDrawUpdate() {

    }

    public getMouse(): MouseState {
        return this.client.controller.getMouseState();
    }

    public getKey(): KeyState {
        return this.client.controller.getKeyState();
    }
    //このシーン用のdiv要素を外す
    public removeSceneDiv() {
        this.client.document.body.removeChild(this.sceneDiv);
    }
    //このシーン用のdiv要素を付ける
    public appendSceneDiv() {
        this.client.document.body.appendChild(this.sceneDiv);
    }

    //子シーンへ移行
    public transitionSubScene(subScene: Scene) {
        this.currentSubScene = subScene;
        this.removeSceneDiv();
        subScene.appendSceneDiv();
        this.currentSubScene.onTransitionedParentScene(this);
    }

    //親シーンから移行されたときに呼び出される
    public onTransitionedParentScene(parentScene: Scene) {
    }

    //親シーンへ戻る
    public returnParentScene() {
        this.parentScene.currentSubScene = null;
        this.removeSceneDiv();
        this.parentScene.appendSceneDiv();
        this.parentScene.onReturnedFromSubScene(this);
    }
    //子シーンから戻ってきたときに呼び出される
    public onReturnedFromSubScene(subScene: Scene) {
    }
}
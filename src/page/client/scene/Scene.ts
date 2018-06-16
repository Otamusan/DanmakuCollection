import { StateTree } from "../../common/StateTree";
import { Client } from '../Client';
import { DOMHandler } from "../dom/DOMHandler";
import { MouseState } from '../MouseState';
import { KeyState } from '../KeyState';

//タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
    export class Scene extends StateTree {
        protected sceneDiv: HTMLDivElement;
        public client: Client;
        constructor(client: Client, div: HTMLDivElement, parentScene?: Scene) {
            super(parentScene);
            this.client = client;
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
            super.onSystemUpdate();
            this.onDrawUpdate();
        }

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
        public transitionSubState(subState: StateTree) {
            if (!(subState instanceof Scene)) return;
            this.currentSubState = subState;
            this.removeSceneDiv();
            (subState as Scene).appendSceneDiv();
            this.currentSubState.onTransitionedParentState(this);
        }

        //親シーンから移行されたときに呼び出される
        public onTransitionedParentState(parentState: StateTree) {
        }

        //親シーンへ戻る
        public returnParentState() {
            this.parentState.currentSubState = null;
            this.removeSceneDiv();
            (this.parentState as Scene).appendSceneDiv();
            this.parentState.onReturnedFromSubState(this);
        }
        //子シーンから戻ってきたときに呼び出される
        public onReturnedFromSubState(subState: StateTree) {
        }
    }
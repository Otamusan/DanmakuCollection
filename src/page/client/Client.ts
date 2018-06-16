import { Common } from "../common/Common";
import { Server } from '../server/Server';

export namespace Client {
    export namespace Sound {
        export class SoundEffect {
            private source: string;
            private volume: number;
            constructor(source: string) {
                this.source = source;
            }

            public play(volume: number) {
                let audio = new Audio(this.source);
                audio.volume = volume;
                audio.play();
            }
        }
        export namespace Sounds {
        }
    }

    export namespace DOM {
        export class CanvasUtil {
            public static rotate(coord: Common.Coord, rad: number, ctx: CanvasRenderingContext2D, func: Function) {
                ctx.save();
                ctx.translate(coord.x, coord.y);
                ctx.rotate(rad);
                ctx.translate(-coord.x, -coord.y);
                func();
                ctx.restore();
            }
        }

        export class DOMHandler {
            public static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] {
                return document.createElement<K>(tagName, options);
            }

            public static getElementByID<T extends HTMLElement>(document: Document, id: string): T {
                return document.getElementById(id) as T;
            }

            //DOMのElementを作成する
            public static createElementByJS<T extends HTMLElement>(name: string, option: Object, ...child: Array<any>): T {
                var element: Element = document.createElement(name);
                if (option) {
                    for (var opt in option) {
                        if (option.hasOwnProperty(opt)) {
                            element.setAttribute(opt, option[opt]);
                        }
                    }
                }
                child.forEach(subelement => {
                    if (typeof subelement == "string") {
                        element.appendChild(document.createTextNode(subelement))
                    } else {
                        element.appendChild(subelement);
                    }
                });
                return element as T;
            }

        }
    }
    export class DivManager {
        private divIDList: Map<string, HTMLDivElement>;
        private document: Document;
        constructor(document: Document) {
            this.divIDList = new Map<string, HTMLDivElement>();
            this.document = document;
        }

        public initDocument() {
            this.document.body.childNodes.forEach((div) => {
                if (div.nodeName == "DIV" && div instanceof HTMLDivElement && div.id != null) {
                    this.divIDList.set(div.id, div);
                    this.document.body.removeChild(div);
                }
            })
        }

        public getDiv(ID: string): HTMLDivElement {
            return this.divIDList.get(ID);
        }

        public getDivCopy(ID: string): HTMLDivElement {
            return Object.assign(this.divIDList.get(ID));
        }
    }

    //タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
    export namespace Scene {
        export class Scene extends Common.StateTree {
            protected sceneDiv: HTMLDivElement;
            public client: Client;
            constructor(client: Client, div: HTMLDivElement, parentScene?: Scene) {
                super(parentScene);
                this.client = client;
                if (div == undefined) {
                    this.sceneDiv = DOM.DOMHandler.createElementByJS<HTMLDivElement>("div", null);
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
            public transitionSubState(subState: Common.StateTree) {
                if (!(subState instanceof Scene)) return;
                this.currentSubState = subState;
                this.removeSceneDiv();
                (subState as Scene).appendSceneDiv();
                this.currentSubState.onTransitionedParentState(this);
            }

            //親シーンから移行されたときに呼び出される
            public onTransitionedParentState(parentState: Common.StateTree) {
            }

            //親シーンへ戻る
            public returnParentState() {
                this.parentState.currentSubState = null;
                this.removeSceneDiv();
                (this.parentState as Scene).appendSceneDiv();
                this.parentState.onReturnedFromSubState(this);
            }
            //子シーンから戻ってきたときに呼び出される
            public onReturnedFromSubState(subState: Common.StateTree) {
            }
        }

        export class SceneTitle extends Scene {
            private game: Scene;
            constructor(client: Client, div: HTMLDivElement) {
                super(client, div);
                this.game = new SceneGame(client, client.divManager.getDivCopy("game"));
            }

            public onUpdate() {
                if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
                    this.transitionSubState(this.game);
                }
            }
        }
        export class SceneGame extends Scene {
            public server: Server.Server;
            public canvas: HTMLCanvasElement;
            public particleManager: ParticleManager;
            public ctx: CanvasRenderingContext2D;
            constructor(client: Client, div: HTMLDivElement) {
                super(client, div);
            }
            public initCanvas() {
                this.canvas = DOM.DOMHandler.getElementByID<HTMLCanvasElement>(document, "canvas");
                this.canvas.width = this.client.width;
                this.canvas.height = this.client.height;
                this.ctx = this.canvas.getContext("2d");
                this.particleManager = new ParticleManager(this.ctx)
            }

            public onTransitionedParentState(parentState: Common.StateTree) {
                this.initCanvas();
            }

            public onUpdate() {
                this.particleManager.onUpdate();
                for (let i = 0; i < 1; i++) {
                    let particle = new Particle.Particle(
                        Common.Color.createFromHSV(80 + Math.random() * 40 - 20, 1, 1),
                        this.getMouse().getCoord().copy().subtractCoord(this.getMouse().getPreviousCoord().copy()).multiplyCoord(Math.random() / 10),
                        this.getMouse().getCoord().copy(),
                        100 * Math.random(),
                        100,
                        new Particle.PFunc([Particle.PFuncs.FADE, Particle.PFuncs.SHRINK, Particle.PFuncs.DECELERATION1_1]),
                        Shape.Shapes.SQUARE,
                        Math.random() * 2 * Math.PI,
                        0.5);
                    this.particleManager.spawnParticle(particle);
                }


            }

            public sendInfoToServer() {

            }

            public onDrawUpdate() {
                this.DrawBackGround(new Common.Color(0, 0, 0));
                this.particleManager.onDrawUpdate();
            }

            public DrawBackGround(color: Common.Color) {
                this.ctx.fillStyle = color.getString();
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }

    //画面でチラチラ動くやつ
    export namespace Particle {
        //パーティクルの機能部分(Bridgeパターン)
        //基本的にパーティクルの機能の種類ごとに実体化する
        export class PFunc {
            private subFuncList: Array<PFunc>
            constructor(subFuncList: Array<PFunc>) {
                this.subFuncList = subFuncList;
            }
            public onSystemUpdate(particle: Particle) {
                if (this.subFuncList != null) {
                    this.subFuncList.forEach(Pfunc => {
                        Pfunc.onSystemUpdate(particle);
                    });
                }

                this.onUpdate(particle);
            }
            public onUpdate(particle: Particle) {
            }
        }

        export class PFuncAccelerate extends PFunc {
            private acc: number
            constructor(subFuncList: Array<PFunc>, acc: number) {
                super(subFuncList);
                this.acc = acc;
            }
            public onUpdate(particle: Particle) {
                let newvector = new Common.Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
                particle.setVector(newvector);
            }
        }

        export class PFuncGravity extends PFunc {
            private acc: number
            constructor(subFuncList: Array<PFunc>, acc: number) {
                super(subFuncList);
                this.acc = acc;
            }
            onUpdate(particle: Particle.Particle) {
                particle.getVector().addDown(this.acc);
            }
        }

        export class PFuncShrink extends PFunc {
            onUpdate(particle: Particle.Particle) {
                let newsize = particle.getSize() - (particle.getSize() / (particle.getRemain() - particle.getTime()));
                particle.setSize(newsize)
            }
        }

        export class PFuncFade extends PFunc {
            onUpdate(particle: Particle.Particle) {
                let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));
                particle.setAlpha(newalpha);
            }
        }
        export class PFuncRotate extends PFunc {
            private acc: number
            constructor(subFuncList: Array<PFunc>, acc: number) {
                super(subFuncList);
                this.acc = acc;
            }
            onUpdate(particle: Particle.Particle) {
                particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
            }
        }

        export namespace PFuncs {
            //1.1倍に加速
            export const ACCELERATE1_1: PFunc = new PFuncAccelerate(null, 1.1);
            //0.9倍に加速
            export const DECELERATION1_1: PFunc = new PFuncAccelerate(null, 0.9);
            //時間が経つと薄くなる
            export const FADE: PFunc = new PFuncFade(null);
            //下に向かって1.1倍に加速
            export const GRAVITY: PFunc = new PFuncGravity(null, 0.1);
            //時間が経つと小さくなる
            export const SHRINK: PFunc = new PFuncShrink(null);
            //１tickに1度回転
            export const ROTATE: PFunc = new PFuncRotate(null, 1);


        }

        //パーティクルの実装部分(Bridgeパターン)
        export class Particle {
            private color: Common.Color; //パーティクルの色
            private vector: Common.Coord; //パーティクルの座標
            private coord: Common.Coord; //パーティクルの速度ベクトル
            private size: number; //パーティクルの大きさ
            private time: number; //パーティクルが生成されてから経った時間（tick）
            private remain: number; //パーティクルが残留する時間(tick)
            private radian: number; //パーティクルの向きのラジアン値
            private alpha: number; //パーティクルの透明度（1~0）
            private isDead: boolean;
            private pFunc: PFunc; //パーティクルが持つ機能
            private shape: Shape.Shape; //パーティクルの形
            constructor(color: Common.Color, vector: Common.Coord, coord: Common.Coord, size: number, remain: number, pFunc: PFunc, shape: Shape.Shape, radian: number, alpha: number) {
                this.color = color;
                this.vector = vector;
                this.coord = coord;
                this.size = size;
                this.remain = remain;
                this.shape = shape;
                this.pFunc = pFunc;
                this.time = 0
                this.radian = radian;
                this.alpha = alpha;
            }
            public onUpdate() {

                this.pFunc.onSystemUpdate(this);
                this.time++;
                this.coord.addCoord(this.vector);
                if (this.time >= this.remain) {
                    this.setDead();
                }
            }
            public setDead() {
                this.isDead = true;
            }

            public isParticleDead(): boolean {
                return this.isDead;
            }

            public getAlpha(): number {
                return this.alpha;
            }

            public setAlpha(alpha: number) {
                this.alpha = alpha;
            }

            public getRad(): number {
                return this.radian;
            }

            public setRad(rad: number) {
                this.radian = rad;
            }

            public getColor(): Common.Color {
                return this.color;
            }
            public setColor(color: Common.Color) {
                this.color = color;
            }
            public getVector(): Common.Coord {
                return this.vector;
            }
            public setVector(vector: Common.Coord) {
                this.vector = vector;
            }
            public getCoord(): Common.Coord {
                return this.coord;
            }
            public setCoord(coord: Common.Coord) {
                this.coord = coord;
            }
            public getSize(): number {
                return this.size;
            }
            public setSize(size: number) {
                this.size = size;
            }
            public getRemain(): number {
                return this.remain;
            }
            public getTime(): number {
                return this.time;
            }
            public getShape(): Shape.Shape {
                return this.shape;
            }
        }
    }
    export class ParticleManager {
        private particleList: Array<Particle.Particle>;
        private ctx: CanvasRenderingContext2D;
        constructor(ctx: CanvasRenderingContext2D) {
            this.particleList = new Array<Particle.Particle>();
            this.ctx = ctx;
        }

        public onUpdate() {
            this.particleList.forEach((particle: Particle.Particle, index: number) => {
                particle.onUpdate();
                if (particle.isParticleDead()) {
                    this.particleList.splice(index, 1);
                }
            });
        }

        public onDrawUpdate() {
            this.particleList.forEach((particle: Particle.Particle, index: number) => {
                particle.getShape().draw(particle.getCoord(), particle.getColor(), particle.getSize(), particle.getRad(), particle.getAlpha(), this.ctx);
            });
        }

        public spawnParticle(particle: Particle.Particle) {
            this.particleList.push(particle);
        }
    }
    //画面に描画する形状
    export namespace Shape {
        export abstract class Shape {
            //描画時の処理
            public draw(coord: Common.Coord, color: Common.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) { };
        }
        export class ShapeCircle extends Shape {
            public draw(coord: Common.Coord, color: Common.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
                ctx.beginPath()
                ctx.fillStyle = color.getString();
                ctx.globalAlpha = alpha;
                ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        export class ShapeSquare extends Shape {
            public draw(coord: Common.Coord, color: Common.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
                DOM.CanvasUtil.rotate(coord, radian, ctx, () => {
                    ctx.beginPath()
                    ctx.fillStyle = color.getString();
                    ctx.globalAlpha = alpha;
                    ctx.rect(coord.x - Math.sqrt(size) / 2, coord.y - Math.sqrt(size) / 2, Math.sqrt(size), Math.sqrt(size))
                    ctx.fill();
                })
            }
        }
        export class Shapes {

        }

        export namespace Shapes {
            export const CIRCLE: Shape = new ShapeCircle();
            export const SQUARE: Shape = new ShapeSquare();
        }
    }

    //クライアント系の処理を総括で管理
    export class Client {
        public document: Document;
        public controller: Controller;
        private rootScene: Scene.Scene;
        public divManager: DivManager;
        public height: number;
        public width: number;
        public server: Server.Server;

        constructor(document: Document, height: number, width: number) {
            this.document = document;
            this.controller = new Controller(this.document);
            this.divManager = new DivManager(document);
            this.divManager.initDocument();
            this.rootScene = new Scene.Scene(this, null);
            this.document.body.style.margin = "0";
            this.document.body.style.overflow = "hidden";
            this.height = height;
            this.width = width;
        }

        public registerMainScene(scene: Scene.Scene) {
            this.rootScene = scene;
        }

        public getMainScene() {
            return this.rootScene;
        }

        public onUpdate = () => {
            this.controller.onUpdate();
            this.rootScene.onSystemUpdate();
        }
    }
    //入力関連
    export class Controller {
        private document: Document;
        private keyState: KeyState;
        private mouseState: MouseState;
        constructor(document: Document) {
            this.document = document;
            this.keyState = new KeyState();
            this.mouseState = new MouseState();
            this.document.onkeydown = this.keyState.onKeyDown;
            this.document.onkeyup = this.keyState.onKeyUp;
            this.document.onmousedown = this.mouseState.onMouseDown;
            this.document.onmouseup = this.mouseState.onMouseUp;
            this.document.onmousemove = this.mouseState.onMouseMove;
        }

        public getKeyState(): KeyState {
            return this.keyState;
        }

        public getMouseState(): MouseState {
            return this.mouseState
        }

        public onUpdate() {
            this.mouseState.onUpdate();
            this.keyState.onUpdate();
        }
    }
    //マウス関係の管理
    export class MouseState {
        private isPressed: Array<boolean>;
        public static LEFT_BUTTON = 0;
        public static MIDDLE_BUTTON = 1;
        public static RIGHT_BUTTON = 2;
        private buttonAmount = 3

        private mouseCoord: Common.Coord = new Common.Coord(0, 0);
        private currentCoord: Common.Coord = new Common.Coord(0, 0);
        private previousCoord: Common.Coord = new Common.Coord(0, 0);

        constructor() {
            this.isPressed = new Array<boolean>(this.buttonAmount);
            this.isPressed.fill(false);
        }
        public onMouseDown = (event: MouseEvent) => {
            this.isPressed[event.button] = true;
        }

        public onMouseUp = (event: MouseEvent) => {
            this.isPressed[event.button] = false;
        }

        public onMouseMove = (event: MouseEvent) => {
            this.mouseCoord = new Common.Coord(event.clientX, event.clientY);
        }

        public isMousePressed(botton: number): boolean {
            return this.isPressed[botton];
        }

        public onUpdate() {
            this.previousCoord = this.currentCoord;
            this.currentCoord = this.mouseCoord;
        }
        // 現在のマウスの座標
        public getCoord(): Common.Coord {
            return this.currentCoord;
        }
        // 1フレーム前のマウスの座標
        public getPreviousCoord(): Common.Coord {
            return this.previousCoord;
        }


    }

    //キー関係の管理
    export class KeyState {
        public static UP: number = 38;
        public static DOWN: number = 40;
        public static LEFT: number = 37;
        public static RIGHT: number = 39;
        private keyAmount = 300;
        private isPressed: Array<boolean>;
        constructor() {
            this.isPressed = new Array<boolean>(4000);
            this.isPressed.fill(false);
        }

        public onKeyDown = (event: KeyboardEvent) => {
            this.isPressed[event.keyCode] = true;
        }

        public onKeyUp = (event: KeyboardEvent) => {
            this.isPressed[event.keyCode] = false;
        }

        public isKeyPressed(keyCode: number): boolean {
            return this.isPressed[keyCode];
        }

        public onUpdate() {

        }
    }
}
namespace Client {
    export class SoundEffect {
        private audio: HTMLAudioElement;
        constructor(source: string) {
            this.audio = new Audio(source);
        }

        public play() {
            this.audio.play();
        }

        public setVolume(volume: number) {
            this.audio.volume = volume;
        }

        public getVolume(): number {
            return this.audio.volume;
        }
    }


    export namespace DOM {
        export class CanvasUtil {
            public static rotate(coord: Util.Coord, rad: number, ctx: CanvasRenderingContext2D, func: Function) {
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
                    this.sceneDiv = DOM.DOMHandler.createElementByJS<HTMLDivElement>("div", null);
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

        export class SceneTitle extends Scene {
            private game: Scene;
            constructor(client: Client, div: HTMLDivElement) {
                super(client, div);
                this.game = new SceneGame(client, client.divManager.getDivCopy("game"));
            }

            public onUpdate() {
                if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
                    this.transitionSubScene(this.game);
                }
            }
        }
        export class SceneGame extends Scene {
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

            public onTransitionedParentScene(scene: Scene) {
                this.initCanvas();
            }

            public onUpdate() {
                this.particleManager.onUpdate();
                let particle = new Particle.Particle(
                    new Util.Color(255*Math.random(), 255*Math.random(), 255*Math.random()),
                    Util.Coord.createFromRadian(Math.random()*2*Math.PI, 4),
                    this.getMouse().getCoord().copy(),
                    10000*Math.random(),
                    100,
                    [Particle.PFuncs.GRAVITY, Particle.PFuncs.SHRINK, Particle.PFuncs.FADE, new Particle.PFuncRotate(Math.random()), Particle.PFuncs.DECELERATION1_1],
                    Shape.Shapes.SQUARE,
                    Math.random()*2*Math.PI,
                    0.5);
                this.particleManager.spawnParticle(particle);
            }

            public onDrawUpdate() {
                this.DrawBackGround(new Util.Color(0, 0, 0));
                this.particleManager.onDrawUpdate();
            }

            public DrawBackGround(color: Util.Color) {
                this.ctx.fillStyle = color.getString();
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
    //画面でチラチラ動くやつ
    export namespace Particle {
        //パーティクルの機能部分(Bridgeパターン)
        //基本的にパーティクルの機能の種類ごとに実体化する
        export abstract class PFunc {
            public onUpdate(particle: Particle) { }
        }

        export class PFuncAccelerate extends PFunc {
            private acc: number
            constructor(acc: number) {
                super();
                this.acc = acc;
            }
            public onUpdate(particle: Particle) {
                let newvector = new Util.Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
                particle.setVector(newvector);
            }
        }

        export class PFuncGravity extends PFunc {
            private acc: number
            constructor(acc: number) {
                super();
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
                //let newalpha = 1-particle.getTime()/particle.getRemain();
                let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));

                particle.setAlpha(newalpha);
            }
        }
        export class PFuncRotate extends PFunc {
            private acc: number
            constructor(acc: number) {
                super();
                this.acc = acc;
            }
            onUpdate(particle: Particle.Particle) {
                particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
            }
        }

        export class PFuncs {
            //1.1倍に加速
            public static ACCELERATE1_1: PFunc = new PFuncAccelerate(1.1);
            //0.9倍に加速
            public static DECELERATION1_1: PFunc = new PFuncAccelerate(0.9);
            //時間がたつと薄くなる
            public static FADE: PFunc = new PFuncFade();
            //下に向かって1.1倍に加速
            public static GRAVITY: PFunc = new PFuncGravity(0.1);
            //時間が経つと小さくなる
            public static SHRINK: PFunc = new PFuncShrink();
            //１tickに1度回転
            public static ROTATE: PFunc = new PFuncRotate(1);
        }

        //パーティクルの実装部分(Bridgeパターン)
        export class Particle {
            private color: Util.Color; //パーティクルの色
            private vector: Util.Coord; //パーティクルの座標
            private coord: Util.Coord; //パーティクルの速度ベクトル
            private size: number; //パーティクルの大きさ
            private time: number; //パーティクルが生成されてから経った時間（tick）
            private remain: number; //パーティクルが残留する時間(tick)
            private radian: number; //パーティクルの向きのラジアン値
            private alpha: number; //パーティクルの透明度（1~0）
            private isDead: boolean;
            private pFuncList: Array<PFunc>; //パーティクルが持つ機能
            private shape: Shape.Shape; //パーティクルの形
            constructor(color: Util.Color, vector: Util.Coord, coord: Util.Coord, size: number, remain: number, list: Array<PFunc>, shape: Shape.Shape, radian: number, alpha: number) {
                this.color = color;
                this.vector = vector;
                this.coord = coord;
                this.size = size;
                this.remain = remain;
                this.shape = shape;
                this.pFuncList = list;
                this.time = 0
                this.radian = radian;
                this.alpha = alpha;
            }
            public onUpdate() {
                this.pFuncList.forEach((pfunc: PFunc) => {
                    pfunc.onUpdate(this);
                });
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

            public getColor(): Util.Color {
                return this.color;
            }
            public setColor(color: Util.Color) {
                this.color = color;
            }
            public getVector(): Util.Coord {
                return this.vector;
            }
            public setVector(vector: Util.Coord) {
                this.vector = vector;
            }
            public getCoord(): Util.Coord {
                return this.coord;
            }
            public setCoord(coord: Util.Coord) {
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
            public draw(coord: Util.Coord, color: Util.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) { };
        }
        export class ShapeCircle extends Shape {
            public draw(coord: Util.Coord, color: Util.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
                ctx.beginPath()
                ctx.fillStyle = color.getString();
                ctx.globalAlpha = alpha;
                ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        export class ShapeSquare extends Shape {
            public draw(coord: Util.Coord, color: Util.Color, size: number, radian: number, alpha: number, ctx: CanvasRenderingContext2D) {
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
            public static CIRCLE: Shape = new ShapeCircle();
            public static SQUARE: Shape = new ShapeSquare();

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

        private mouseCoord: Util.Coord = new Util.Coord(0, 0);
        private currentCoord: Util.Coord = new Util.Coord(0, 0);
        private previousCoord: Util.Coord = new Util.Coord(0, 0);

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
            this.mouseCoord = new Util.Coord(event.clientX, event.clientY);
        }

        public isMousePressed(botton: number): boolean {
            return this.isPressed[botton];
        }

        public onUpdate() {
            this.previousCoord = this.currentCoord;
            this.currentCoord = this.mouseCoord;
        }
        // 現在のマウスの座標
        public getCoord(): Util.Coord {
            return this.currentCoord;
        }
        // 1フレーム前のマウスの座標
        public getPreviousCoord(): Util.Coord {
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

    //出力（描画）関連
    /*export class View {
        private height: number;
        private width: number;
        private canvas: any;
        private document: Document

        constructor(document: Document) {
            this.document = document;
            this.height = window.innerHeight;
            this.width = window.innerWidth;

            this.canvas = document.createElement("canvas");
            this.canvas.height = this.height;
            this.canvas.width = this.width;

            this.displayCanvas();
        }

        //canvasの表示
        public displayCanvas() {
            this.document.body.style.margin = "0";
            this.document.body.style.overflow = "hidden"
            this.document.body.appendChild(this.canvas);
        }
        public drawBackGround(color: Util.Color) {
            this.getctx().fillStyle = color.getString();
            this.getctx().fillRect(0, 0, this.width, this.height)
        }
        public getctx(): CanvasRenderingContext2D {
            return this.canvas.getContext('2d');
        }
        public getGL(): WebGLRenderingContext {
            return this.canvas.getContext("webgl");
        }
        //webGLの初期化
        public WebGLinit() {
            this.getGL().clearColor(0.0, 0.0, 0.0, 1.0);
            this.getGL().enable(this.getGL().DEPTH_TEST);
            this.getGL().depthFunc(this.getGL().LEQUAL);
            this.getGL().clear(this.getGL().COLOR_BUFFER_BIT | this.getGL().DEPTH_BUFFER_BIT);
        }
        public onUpdate() {

        }
    }*/


}

namespace Util {
    export class Color {
        private r: number;
        private g: number;
        private b: number;

        constructor(r: number, g: number, b: number) {
            if (r > 255) {
                this.r = 255;
            } else {
                this.r = r;
            }
            if (g > 255) {
                this.g = 255;
            } else {
                this.g = g;
            }
            if (b > 255) {
                this.b = 255;
            } else {
                this.b = b;
            }
        }
        // hは0から359まで
        // sは0から1まで
        // vは0から1まで
        public static createFromHSV(h: number, s: number, v: number) {
            let c = v * s;
            let Hp = h / 60;
            let x = c * (1 - Math.abs(Hp % 2 - 1));
            let r;
            let g;
            let b;
            if (0 <= Hp && Hp < 1) {
                r = c; g = x; b = 0;
            }
            if (1 <= Hp && Hp < 2) {
                r = x; g = c; b = 0;
            }
            if (2 <= Hp && Hp < 3) {
                r = 0; g = c; b = x;
            }
            if (3 <= Hp && Hp < 4) {
                r = 0; g = x; b = c;
            }
            if (4 <= Hp && Hp < 5) {
                r = x; g = 0; b = c;
            }
            if (5 <= Hp && Hp < 6) {
                r = c; g = 0; b = x;
            }
            var m = v - c;
            r += m; g += m; b += m
            r = Math.floor(r * 255);
            g = Math.floor(g * 255);
            b = Math.floor(b * 255);
            return new Color(r, g, b);
        }

        public getString(): string {
            let r = Math.floor(this.r).toString(16)
            let g = Math.floor(this.g).toString(16)
            let b = Math.floor(this.b).toString(16)
            if (r.length == 1) { r = "0" + r }
            if (g.length == 1) { g = "0" + g }
            if (b.length == 1) { b = "0" + b }


            return "#" + r + g + b;
        }

        public getR() {
            return this.r
        }

        public getG() {
            return this.g
        }

        public getB() {
            return this.b
        }

    }

    export class Coord {
        public x: number;
        public y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public static createFromRadian(rad: number, length: number): Coord {
            let x = Math.cos(rad) * length;
            let y = Math.sin(rad) * length;
            return new Coord(x, y);
        }

        public getDistance(otherCoord: Coord): number {
            return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
        }

        public isEqual(other: Coord): boolean {
            return other.x == this.x && other.y == this.y;
        }

        public copy(): Coord {
            return new Coord(this.x, this.y);
        }

        public addCoord(other: Coord) {
            this.x += other.x;
            this.y += other.y;
        }

        public addUp(n: number) {
            this.y -= n
        }

        public addDown(n: number) {
            this.y += n
        }

        public addRight(n: number) {
            this.x += n
        }

        public addLeft(n: number) {
            this.x -= n
        }
    }
}

namespace Server {

}

namespace main {
    const client = new Client.Client(document, 600, 800);
    const mainScene = new Client.Scene.SceneTitle(client, client.divManager.getDivCopy("title"));
    client.registerMainScene(mainScene);
    mainScene.appendSceneDiv();
    setInterval(client.onUpdate, 1000 / 60);
}
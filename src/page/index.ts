namespace Client {
    //タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理

    export namespace Scene {
        export class Scene {
            public client: Client;
            private parentScene: Scene;
            protected currentSubScene: Scene;
            public particleManager

            constructor(client: Client, parentScene?: Scene) {
                this.client = client;
                this.currentSubScene = null
                if (parentScene == undefined) {
                    this.parentScene = null;
                } else {
                    this.parentScene = parentScene;
                }
            }

            public onSystemUpdate() {
                if (this.currentSubScene != null) {
                    this.currentSubScene.onUpdate();
                    return;
                }
                this.onUpdate();
            }
            //オーバーライド用
            public onUpdate() {

            }

            public getView(): View {
                return this.client.view;
            }

            public getMouse(): MouseState {
                return this.client.controller.getMouseState();
            }

            public getKey(): KeyState {
                return this.client.controller.getKeyState();
            }
            //子シーンへ移行
            public transitionSubScene(subScene: Scene) {
                this.currentSubScene = subScene;
                this.currentSubScene.onTransitionedParentScene(this);
            }

            //親シーンから移行されたときに呼び出される
            public onTransitionedParentScene(parentScene: Scene) {
            }

            //親シーンへ戻る
            public returnParentScene() {
                this.parentScene.currentSubScene = null;
                this.parentScene.onReturnedFromSubScene(this);
            }
            //子シーンから戻ってきたときに呼び出される
            public onReturnedFromSubScene(subScene: Scene) {
            }
        }

        export class SceneSelect extends Scene {
            private game: Scene;
            constructor(client: Client) {
                super(client);
            }

            onUpdate() {
            }
        }
    }
    //画面でチラチラ動くやつ
    export namespace Particle {
        export class Particle {
            public color: Util.Color;
            public shape: Shape.Shape;
            constructor(color: Util.Color, shape: Shape.Shape) {
                this.shape = shape;
                this.color = color;
            }
        }
    }
    //画面に描画する形状
    export namespace Shape {
        export abstract class Shape {
            //描画時の処理
            public draw(coord: Util.Coord, color: Util.Color, view: View) { };
        }
        export class ShapeCircle extends Shape {
            private radious: number
            constructor(radious: number) {
                super();
                this.radious = radious;
            }
            public draw(coord: Util.Coord, color: Util.Color, view: View) {
                view.getctx().beginPath()
                view.getctx().fillStyle = color.getString();
                view.getctx().arc(coord.x, coord.y, this.radious, 0, 2 * Math.PI);
                view.getctx().fill();
            }
        }
    }



    export class particleManager {
        public List()
        constructor() {

        }


    }



    //クライアント系の処理を総括で管理
    export class Client {
        public document: Document;
        public view: View;
        public controller: Controller;
        private rootScene: Scene.Scene;
        constructor(document: Document) {
            this.document = document;
            this.view = new View(this.document);
            this.controller = new Controller(this.document);
            this.rootScene = new Scene.Scene(this);
        }

        public registerMainScene(scene: Scene.Scene) {
            this.rootScene = scene;
        }

        public getMainScene() {
            return this.rootScene;
        }

        public onUpdate = () => {
            this.view.onUpdate();
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

        private mouseCoord: Util.Coord;
        private currentCoord: Util.Coord;
        private previousCoord: Util.Coord;

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
    export class View {
        private height: number;
        private width: number;
        private canvas: any;
        private document: Document

        constructor(document: Document) {
            this.document = document;
            this.height = this.document.documentElement.clientHeight;
            this.width = this.document.documentElement.clientWidth;
            //this.canvas = Util.DOMHandler.createElement('canvas', {
            //    height: this.height,
            //    width: this.width
            //});

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
    }


}

namespace Util {
    /*
    export class DOMHandler {
        //DOMのElementを作成する
        public static createElement(name: string, attributes: Object): Element {
            var node: Element = document.createElement(name);
            if (attributes) {
                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        node.setAttribute(attr, attributes[attr]);
                    }
                }
            }
            for (var i = 2; i < arguments.length; i++) {
                var child = arguments[i];
                if (typeof child == "string") {
                    child = document.createTextNode(child);
                }
                node.appendChild(child);
            }
            return node;
        }
    }
    */
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
            return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
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

        public getDistance(otherCoord: Coord) {
            return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
        }

        public isEqual(other: Coord) {
            return other.x == this.x && other.y == this.y;
        }
    }
}

namespace Server {

}

namespace main {
    const client = new Client.Client(document);
    const mainScene = new Client.Scene.SceneSelect(client);
    client.registerMainScene(mainScene);
    setInterval(client.onUpdate, 1000 / 60);
}
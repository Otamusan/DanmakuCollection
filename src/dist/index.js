var Client;
(function (Client_1) {
    //タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
    let Scene;
    (function (Scene_1) {
        class Scene {
            constructor(client, parentScene) {
                this.client = client;
                this.currentSubScene = null;
                if (parentScene == undefined) {
                    this.parentScene = null;
                }
                else {
                    this.parentScene = parentScene;
                }
            }
            onSystemUpdate() {
                if (this.currentSubScene != null) {
                    this.currentSubScene.onUpdate();
                    return;
                }
                this.onUpdate();
            }
            //オーバーライド用
            onUpdate() {
            }
            getView() {
                return this.client.view;
            }
            getMouse() {
                return this.client.controller.getMouseState();
            }
            getKey() {
                return this.client.controller.getKeyState();
            }
            //子シーンへ移行
            transitionSubScene(subScene) {
                this.currentSubScene = subScene;
                this.currentSubScene.onTransitionedParentScene(this);
            }
            //親シーンから移行されたときに呼び出される
            onTransitionedParentScene(parentScene) {
            }
            //親シーンへ戻る
            returnParentScene() {
                this.parentScene.currentSubScene = null;
                this.parentScene.onReturnedFromSubScene(this);
            }
            //子シーンから戻ってきたときに呼び出される
            onReturnedFromSubScene(subScene) {
            }
        }
        Scene_1.Scene = Scene;
        class SceneSelect extends Scene {
            constructor(client) {
                super(client);
            }
            onUpdate() {
            }
        }
        Scene_1.SceneSelect = SceneSelect;
    })(Scene = Client_1.Scene || (Client_1.Scene = {}));
    //画面でチラチラ動くやつ
    let Particle;
    (function (Particle_1) {
        class Particle {
            constructor(color, shape) {
                this.shape = shape;
                this.color = color;
            }
        }
        Particle_1.Particle = Particle;
    })(Particle = Client_1.Particle || (Client_1.Particle = {}));
    //画面に描画する形状
    let Shape;
    (function (Shape_1) {
        class Shape {
            //描画時の処理
            draw(coord, color, view) { }
            ;
        }
        Shape_1.Shape = Shape;
        class ShapeCircle extends Shape {
            constructor(radious) {
                super();
                this.radious = radious;
            }
            draw(coord, color, view) {
                view.getctx().beginPath();
                view.getctx().fillStyle = color.getString();
                view.getctx().arc(coord.x, coord.y, this.radious, 0, 2 * Math.PI);
                view.getctx().fill();
            }
        }
        Shape_1.ShapeCircle = ShapeCircle;
    })(Shape = Client_1.Shape || (Client_1.Shape = {}));
    class particleManager {
        constructor() {
        }
    }
    Client_1.particleManager = particleManager;
    //クライアント系の処理を総括で管理
    class Client {
        constructor(document) {
            this.onUpdate = () => {
                this.view.onUpdate();
                this.controller.onUpdate();
                this.rootScene.onSystemUpdate();
            };
            this.document = document;
            this.view = new View(this.document);
            this.controller = new Controller(this.document);
            this.rootScene = new Scene.Scene(this);
        }
        registerMainScene(scene) {
            this.rootScene = scene;
        }
        getMainScene() {
            return this.rootScene;
        }
    }
    Client_1.Client = Client;
    //入力関連
    class Controller {
        constructor(document) {
            this.document = document;
            this.keyState = new KeyState();
            this.mouseState = new MouseState();
            this.document.onkeydown = this.keyState.onKeyDown;
            this.document.onkeyup = this.keyState.onKeyUp;
            this.document.onmousedown = this.mouseState.onMouseDown;
            this.document.onmouseup = this.mouseState.onMouseUp;
            this.document.onmousemove = this.mouseState.onMouseMove;
        }
        getKeyState() {
            return this.keyState;
        }
        getMouseState() {
            return this.mouseState;
        }
        onUpdate() {
            this.mouseState.onUpdate();
            this.keyState.onUpdate();
        }
    }
    Client_1.Controller = Controller;
    //マウス関係の管理
    class MouseState {
        constructor() {
            this.buttonAmount = 3;
            this.onMouseDown = (event) => {
                this.isPressed[event.button] = true;
            };
            this.onMouseUp = (event) => {
                this.isPressed[event.button] = false;
            };
            this.onMouseMove = (event) => {
                this.mouseCoord = new Util.Coord(event.clientX, event.clientY);
            };
            this.isPressed = new Array(this.buttonAmount);
            this.isPressed.fill(false);
        }
        isMousePressed(botton) {
            return this.isPressed[botton];
        }
        onUpdate() {
            this.previousCoord = this.currentCoord;
            this.currentCoord = this.mouseCoord;
        }
        // 現在のマウスの座標
        getCoord() {
            return this.currentCoord;
        }
        // 1フレーム前のマウスの座標
        getPreviousCoord() {
            return this.previousCoord;
        }
    }
    MouseState.LEFT_BUTTON = 0;
    MouseState.MIDDLE_BUTTON = 1;
    MouseState.RIGHT_BUTTON = 2;
    Client_1.MouseState = MouseState;
    //キー関係の管理
    class KeyState {
        constructor() {
            this.keyAmount = 300;
            this.onKeyDown = (event) => {
                this.isPressed[event.keyCode] = true;
            };
            this.onKeyUp = (event) => {
                this.isPressed[event.keyCode] = false;
            };
            this.isPressed = new Array(4000);
            this.isPressed.fill(false);
        }
        isKeyPressed(keyCode) {
            return this.isPressed[keyCode];
        }
        onUpdate() {
        }
    }
    KeyState.UP = 38;
    KeyState.DOWN = 40;
    KeyState.LEFT = 37;
    KeyState.RIGHT = 39;
    Client_1.KeyState = KeyState;
    //出力（描画）関連
    class View {
        constructor(document) {
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
        displayCanvas() {
            this.document.body.style.margin = "0";
            this.document.body.style.overflow = "hidden";
            this.document.body.appendChild(this.canvas);
        }
        getctx() {
            return this.canvas.getContext('2d');
        }
        getGL() {
            return this.canvas.getContext("webgl");
        }
        //webGLの初期化
        WebGLinit() {
            this.getGL().clearColor(0.0, 0.0, 0.0, 1.0);
            this.getGL().enable(this.getGL().DEPTH_TEST);
            this.getGL().depthFunc(this.getGL().LEQUAL);
            this.getGL().clear(this.getGL().COLOR_BUFFER_BIT | this.getGL().DEPTH_BUFFER_BIT);
        }
        onUpdate() {
        }
    }
    Client_1.View = View;
})(Client || (Client = {}));
var Util;
(function (Util) {
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
    class Color {
        constructor(r, g, b) {
            if (r > 255) {
                this.r = 255;
            }
            else {
                this.r = r;
            }
            if (g > 255) {
                this.g = 255;
            }
            else {
                this.g = g;
            }
            if (b > 255) {
                this.b = 255;
            }
            else {
                this.b = b;
            }
        }
        // hは0から359まで
        // sは0から1まで
        // vは0から1まで
        static createFromHSV(h, s, v) {
            let c = v * s;
            let Hp = h / 60;
            let x = c * (1 - Math.abs(Hp % 2 - 1));
            let r;
            let g;
            let b;
            if (0 <= Hp && Hp < 1) {
                r = c;
                g = x;
                b = 0;
            }
            if (1 <= Hp && Hp < 2) {
                r = x;
                g = c;
                b = 0;
            }
            if (2 <= Hp && Hp < 3) {
                r = 0;
                g = c;
                b = x;
            }
            if (3 <= Hp && Hp < 4) {
                r = 0;
                g = x;
                b = c;
            }
            if (4 <= Hp && Hp < 5) {
                r = x;
                g = 0;
                b = c;
            }
            if (5 <= Hp && Hp < 6) {
                r = c;
                g = 0;
                b = x;
            }
            var m = v - c;
            r += m;
            g += m;
            b += m;
            r = Math.floor(r * 255);
            g = Math.floor(g * 255);
            b = Math.floor(b * 255);
            return new Color(r, g, b);
        }
        getString() {
            return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
        }
        getR() {
            return this.r;
        }
        getG() {
            return this.g;
        }
        getB() {
            return this.b;
        }
    }
    Util.Color = Color;
    class Coord {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        getDistance(otherCoord) {
            return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
        }
        isEqual(other) {
            return other.x == this.x && other.y == this.y;
        }
    }
    Util.Coord = Coord;
})(Util || (Util = {}));
var main;
(function (main) {
    const client = new Client.Client(document);
    const mainScene = new Client.Scene.SceneSelect(client);
    client.registerMainScene(mainScene);
    setInterval(client.onUpdate, 1000 / 60);
})(main || (main = {}));
//# sourceMappingURL=index.js.map
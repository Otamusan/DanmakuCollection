var Client;
(function (Client_1) {
    //タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
    let Scene;
    (function (Scene_1) {
        class Scene {
            constructor(client, parentScene) {
                this.client = client;
                this.currentSubScene = null;
                this.particleManager = new particleManager(client.view);
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
                this.particleManager.onUpdate();
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
                let particle = new Particle.Particle(new Util.Color(0, 0, 0), new Util.Coord(0.1, 0.1), new Util.Coord(40, 40), 10, 50, [Particle.PFuncs.ACCELERATE1_1], new Shape.ShapeCircle());
                this.particleManager.spawnParticle(particle);
            }
        }
        Scene_1.SceneSelect = SceneSelect;
    })(Scene = Client_1.Scene || (Client_1.Scene = {}));
    //画面でチラチラ動くやつ
    let Particle;
    (function (Particle_1) {
        //パーティクルの機能部分(Bridgeパターン)
        //基本的にパーティクルの機能の種類ごとに実体化する
        class PFunc {
            onUpdate(particle) { }
        }
        Particle_1.PFunc = PFunc;
        class PFuncAccelerate extends PFunc {
            constructor(acc) {
                super();
                this.acc = acc;
            }
            onUpdate(particle) {
                let newvector = new Util.Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
                particle.setVector(newvector);
            }
        }
        Particle_1.PFuncAccelerate = PFuncAccelerate;
        class PFuncs {
        }
        PFuncs.ACCELERATE1_1 = new PFuncAccelerate(1.1);
        Particle_1.PFuncs = PFuncs;
        //パーティクルの実装部分(Bridgeパターン)
        class Particle {
            constructor(color, vector, coord, size, remain, list, shape) {
                this.color = color;
                this.vector = vector;
                this.coord = coord;
                this.size = size;
                this.remain = remain;
                this.shape = shape;
                this.pFuncList = list;
                this.time = 0;
            }
            onUpdate() {
                this.pFuncList.forEach((pfunc) => {
                    pfunc.onUpdate(this);
                });
                this.time++;
                this.coord.addCoord(this.vector);
                if (this.time >= this.remain) {
                    this.setDead();
                }
            }
            setDead() {
                this.isDead = true;
            }
            isParticleDead() {
                return this.isDead;
            }
            getColor() {
                return this.color;
            }
            setColor(color) {
                this.color = color;
            }
            getVector() {
                return this.vector;
            }
            setVector(vector) {
                this.vector = vector;
            }
            getCoord() {
                return this.coord;
            }
            setCoord(coord) {
                this.coord = coord;
            }
            getSize() {
                return this.size;
            }
            setSize(size) {
                this.size = size;
            }
            getRemain() {
                return this.remain;
            }
            getTime() {
                return this.time;
            }
            getShape() {
                return this.shape;
            }
        }
        Particle_1.Particle = Particle;
    })(Particle = Client_1.Particle || (Client_1.Particle = {}));
    class particleManager {
        constructor(view) {
            this.particleList = new Array();
            this.view = view;
        }
        onUpdate() {
            this.particleList.forEach((particle, index) => {
                particle.onUpdate();
                particle.getShape().draw(particle.getCoord(), particle.getColor(), particle.getSize(), this.view);
                if (particle.isParticleDead()) {
                    this.particleList.splice(index, 0);
                }
            });
        }
        spawnParticle(particle) {
            this.particleList.push(particle);
        }
    }
    Client_1.particleManager = particleManager;
    //画面に描画する形状
    let Shape;
    (function (Shape_1) {
        class Shape {
            //描画時の処理
            draw(coord, color, size, view) { }
            ;
        }
        Shape_1.Shape = Shape;
        class ShapeCircle extends Shape {
            draw(coord, color, size, view) {
                view.getctx().beginPath();
                view.getctx().fillStyle = color.getString();
                view.getctx().arc(coord.x, coord.y, size, 0, 2 * Math.PI);
                view.getctx().fill();
            }
        }
        Shape_1.ShapeCircle = ShapeCircle;
    })(Shape = Client_1.Shape || (Client_1.Shape = {}));
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
        copy() {
            return new Coord(this.x, this.y);
        }
        addCoord(other) {
            this.x += other.x;
            this.y += other.y;
        }
        addUp(n) {
            this.y -= n;
        }
        addDown(n) {
            this.y += n;
        }
        addRight(n) {
            this.x += n;
        }
        addLeft(n) {
            this.x -= n;
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
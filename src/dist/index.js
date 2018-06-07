var Common;
(function (Common) {
    class StateTree {
        constructor(parentState) {
            this.currentSubState = null;
            if (parentState == undefined) {
                this.parentState = null;
            }
            else {
                this.parentState = parentState;
            }
        }
        onSystemUpdate() {
            if (this.currentSubState != null) {
                this.currentSubState.onSystemUpdate();
                return;
            }
            this.onUpdate();
        }
        //オーバーライド用
        onUpdate() {
        }
        //子ステートへ移行
        transitionSubState(subState) {
            this.currentSubState = subState;
            this.currentSubState.onTransitionedParentState(this);
        }
        //親ステートから移行されたときに呼び出される
        onTransitionedParentState(parentState) {
        }
        //親ステートへ戻る
        returnParentState() {
            this.parentState.currentSubState = null;
            this.parentState.onReturnedFromSubState(this);
        }
        //子ステートから戻ってきたときに呼び出される
        onReturnedFromSubState(subState) {
        }
    }
    Common.StateTree = StateTree;
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
            let r = Math.floor(this.r).toString(16);
            let g = Math.floor(this.g).toString(16);
            let b = Math.floor(this.b).toString(16);
            if (r.length == 1) {
                r = "0" + r;
            }
            if (g.length == 1) {
                g = "0" + g;
            }
            if (b.length == 1) {
                b = "0" + b;
            }
            return "#" + r + g + b;
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
    Common.Color = Color;
    class Coord {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        static createFromRadian(rad, length) {
            let x = Math.cos(rad) * length;
            let y = Math.sin(rad) * length;
            return new Coord(x, y);
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
        subtractCoord(other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        }
        addCoord(other) {
            this.x += other.x;
            this.y += other.y;
            return this;
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
    Common.Coord = Coord;
})(Common || (Common = {}));
var Client;
(function (Client_1) {
    class SoundEffect {
        constructor(source) {
            this.audio = new Audio(source);
        }
        play() {
            this.audio.play();
        }
        setVolume(volume) {
            this.audio.volume = volume;
        }
        getVolume() {
            return this.audio.volume;
        }
    }
    Client_1.SoundEffect = SoundEffect;
    let DOM;
    (function (DOM) {
        class CanvasUtil {
            static rotate(coord, rad, ctx, func) {
                ctx.save();
                ctx.translate(coord.x, coord.y);
                ctx.rotate(rad);
                ctx.translate(-coord.x, -coord.y);
                func();
                ctx.restore();
            }
        }
        DOM.CanvasUtil = CanvasUtil;
        class DOMHandler {
            static createElement(tagName, options) {
                return document.createElement(tagName, options);
            }
            static getElementByID(document, id) {
                return document.getElementById(id);
            }
            //DOMのElementを作成する
            static createElementByJS(name, option, ...child) {
                var element = document.createElement(name);
                if (option) {
                    for (var opt in option) {
                        if (option.hasOwnProperty(opt)) {
                            element.setAttribute(opt, option[opt]);
                        }
                    }
                }
                child.forEach(subelement => {
                    if (typeof subelement == "string") {
                        element.appendChild(document.createTextNode(subelement));
                    }
                    else {
                        element.appendChild(subelement);
                    }
                });
                return element;
            }
        }
        DOM.DOMHandler = DOMHandler;
    })(DOM = Client_1.DOM || (Client_1.DOM = {}));
    class DivManager {
        constructor(document) {
            this.divIDList = new Map();
            this.document = document;
        }
        initDocument() {
            this.document.body.childNodes.forEach((div) => {
                if (div.nodeName == "DIV" && div instanceof HTMLDivElement && div.id != null) {
                    this.divIDList.set(div.id, div);
                    this.document.body.removeChild(div);
                }
            });
        }
        getDiv(ID) {
            return this.divIDList.get(ID);
        }
        getDivCopy(ID) {
            return Object.assign(this.divIDList.get(ID));
        }
    }
    Client_1.DivManager = DivManager;
    //タイトル画面やゲーム画面、セレクト画面、メニュー画面などの管理
    let Scene;
    (function (Scene_1) {
        class Scene extends Common.StateTree {
            constructor(client, div, parentScene) {
                super(parentScene);
                this.client = client;
                if (div == undefined) {
                    this.sceneDiv = DOM.DOMHandler.createElementByJS("div", null);
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
        Scene_1.Scene = Scene;
        class SceneTitle extends Scene {
            constructor(client, div) {
                super(client, div);
                this.game = new SceneGame(client, client.divManager.getDivCopy("game"));
            }
            onUpdate() {
                if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
                    this.transitionSubState(this.game);
                }
            }
        }
        Scene_1.SceneTitle = SceneTitle;
        class SceneGame extends Scene {
            constructor(client, div) {
                super(client, div);
            }
            initCanvas() {
                this.canvas = DOM.DOMHandler.getElementByID(document, "canvas");
                this.canvas.width = this.client.width;
                this.canvas.height = this.client.height;
                this.ctx = this.canvas.getContext("2d");
                this.particleManager = new ParticleManager(this.ctx);
            }
            onTransitionedParentState(parentState) {
                this.initCanvas();
            }
            onUpdate() {
                this.particleManager.onUpdate();
                for (let i = 0; i < 100; i++) {
                    let particle = new Particle.Particle(new Common.Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random()), Common.Coord.createFromRadian(Math.random() * 2 * Math.PI, 4).addCoord(this.getMouse().getCoord().copy().subtractCoord(this.getMouse().getPreviousCoord().copy())), this.getMouse().getCoord().copy(), 10000 * Math.random(), 100, [Particle.PFuncs.GRAVITY, Particle.PFuncs.SHRINK, Particle.PFuncs.FADE, new Particle.PFuncRotate(Math.random()), Particle.PFuncs.DECELERATION1_1], Shape.Shapes.SQUARE, Math.random() * 2 * Math.PI, 0.5);
                    this.particleManager.spawnParticle(particle);
                }
            }
            onDrawUpdate() {
                this.DrawBackGround(new Common.Color(0, 0, 0));
                this.particleManager.onDrawUpdate();
            }
            DrawBackGround(color) {
                this.ctx.fillStyle = color.getString();
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        Scene_1.SceneGame = SceneGame;
    })(Scene = Client_1.Scene || (Client_1.Scene = {}));
    /*export namespace Scene {
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
                    new Common.Color(255*Math.random(), 255*Math.random(), 255*Math.random()),
                    Common.Coord.createFromRadian(Math.random()*2*Math.PI, 4).addCoord(this.getMouse().getCoord().copy().subtractCoord(this.getMouse().getPreviousCoord().copy())),
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
                this.DrawBackGround(new Common.Color(0, 0, 0));
                this.particleManager.onDrawUpdate();
            }

            public DrawBackGround(color: Common.Color) {
                this.ctx.fillStyle = color.getString();
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }*/
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
                let newvector = new Common.Coord(particle.getVector().x * this.acc, particle.getVector().y * this.acc);
                particle.setVector(newvector);
            }
        }
        Particle_1.PFuncAccelerate = PFuncAccelerate;
        class PFuncGravity extends PFunc {
            constructor(acc) {
                super();
                this.acc = acc;
            }
            onUpdate(particle) {
                particle.getVector().addDown(this.acc);
            }
        }
        Particle_1.PFuncGravity = PFuncGravity;
        class PFuncShrink extends PFunc {
            onUpdate(particle) {
                let newsize = particle.getSize() - (particle.getSize() / (particle.getRemain() - particle.getTime()));
                particle.setSize(newsize);
            }
        }
        Particle_1.PFuncShrink = PFuncShrink;
        class PFuncFade extends PFunc {
            onUpdate(particle) {
                //let newalpha = 1-particle.getTime()/particle.getRemain();
                let newalpha = particle.getAlpha() - (particle.getAlpha() / (particle.getRemain() - particle.getTime()));
                particle.setAlpha(newalpha);
            }
        }
        Particle_1.PFuncFade = PFuncFade;
        class PFuncRotate extends PFunc {
            constructor(acc) {
                super();
                this.acc = acc;
            }
            onUpdate(particle) {
                particle.setRad(particle.getRad() + Math.PI / 180 * this.acc);
            }
        }
        Particle_1.PFuncRotate = PFuncRotate;
        class PFuncs {
        }
        //1.1倍に加速
        PFuncs.ACCELERATE1_1 = new PFuncAccelerate(1.1);
        //0.9倍に加速
        PFuncs.DECELERATION1_1 = new PFuncAccelerate(0.9);
        //時間が経つと薄くなる
        PFuncs.FADE = new PFuncFade();
        //下に向かって1.1倍に加速
        PFuncs.GRAVITY = new PFuncGravity(0.1);
        //時間が経つと小さくなる
        PFuncs.SHRINK = new PFuncShrink();
        //１tickに1度回転
        PFuncs.ROTATE = new PFuncRotate(1);
        Particle_1.PFuncs = PFuncs;
        //パーティクルの実装部分(Bridgeパターン)
        class Particle {
            constructor(color, vector, coord, size, remain, list, shape, radian, alpha) {
                this.color = color;
                this.vector = vector;
                this.coord = coord;
                this.size = size;
                this.remain = remain;
                this.shape = shape;
                this.pFuncList = list;
                this.time = 0;
                this.radian = radian;
                this.alpha = alpha;
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
            getAlpha() {
                return this.alpha;
            }
            setAlpha(alpha) {
                this.alpha = alpha;
            }
            getRad() {
                return this.radian;
            }
            setRad(rad) {
                this.radian = rad;
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
    class ParticleManager {
        constructor(ctx) {
            this.particleList = new Array();
            this.ctx = ctx;
        }
        onUpdate() {
            this.particleList.forEach((particle, index) => {
                particle.onUpdate();
                if (particle.isParticleDead()) {
                    this.particleList.splice(index, 1);
                }
            });
        }
        onDrawUpdate() {
            this.particleList.forEach((particle, index) => {
                particle.getShape().draw(particle.getCoord(), particle.getColor(), particle.getSize(), particle.getRad(), particle.getAlpha(), this.ctx);
            });
        }
        spawnParticle(particle) {
            this.particleList.push(particle);
        }
    }
    Client_1.ParticleManager = ParticleManager;
    //画面に描画する形状
    let Shape;
    (function (Shape_1) {
        class Shape {
            //描画時の処理
            draw(coord, color, size, radian, alpha, ctx) { }
            ;
        }
        Shape_1.Shape = Shape;
        class ShapeCircle extends Shape {
            draw(coord, color, size, radian, alpha, ctx) {
                ctx.beginPath();
                ctx.fillStyle = color.getString();
                ctx.globalAlpha = alpha;
                ctx.arc(coord.x, coord.y, Math.sqrt(size / Math.PI), 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        Shape_1.ShapeCircle = ShapeCircle;
        class ShapeSquare extends Shape {
            draw(coord, color, size, radian, alpha, ctx) {
                DOM.CanvasUtil.rotate(coord, radian, ctx, () => {
                    ctx.beginPath();
                    ctx.fillStyle = color.getString();
                    ctx.globalAlpha = alpha;
                    ctx.rect(coord.x - Math.sqrt(size) / 2, coord.y - Math.sqrt(size) / 2, Math.sqrt(size), Math.sqrt(size));
                    ctx.fill();
                });
            }
        }
        Shape_1.ShapeSquare = ShapeSquare;
        class Shapes {
        }
        Shapes.CIRCLE = new ShapeCircle();
        Shapes.SQUARE = new ShapeSquare();
        Shape_1.Shapes = Shapes;
    })(Shape = Client_1.Shape || (Client_1.Shape = {}));
    //クライアント系の処理を総括で管理
    class Client {
        constructor(document, height, width) {
            this.onUpdate = () => {
                this.controller.onUpdate();
                this.rootScene.onSystemUpdate();
            };
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
            this.mouseCoord = new Common.Coord(0, 0);
            this.currentCoord = new Common.Coord(0, 0);
            this.previousCoord = new Common.Coord(0, 0);
            this.onMouseDown = (event) => {
                this.isPressed[event.button] = true;
            };
            this.onMouseUp = (event) => {
                this.isPressed[event.button] = false;
            };
            this.onMouseMove = (event) => {
                this.mouseCoord = new Common.Coord(event.clientX, event.clientY);
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
})(Client || (Client = {}));
var Server;
(function (Server_1) {
    class Server {
        constructor() {
            this.fieldList = new Array();
        }
    }
    Server_1.Server = Server;
    let Field;
    (function (Field_1) {
        class Field {
            constructor() {
                this.playerList = new Array();
            }
        }
        Field_1.Field = Field;
    })(Field = Server_1.Field || (Server_1.Field = {}));
    class Player {
        constructor(name) {
            this.name = name;
        }
    }
    Server_1.Player = Player;
    class PlayerManager {
        constructor() {
            this.playerList = new Array();
        }
    }
    Server_1.PlayerManager = PlayerManager;
})(Server || (Server = {}));
var main;
(function (main) {
    const client = new Client.Client(document, 600, 800);
    const mainScene = new Client.Scene.SceneTitle(client, client.divManager.getDivCopy("title"));
    client.registerMainScene(mainScene);
    mainScene.appendSceneDiv();
    setInterval(client.onUpdate, 1000 / 60);
})(main || (main = {}));
//# sourceMappingURL=index.js.map
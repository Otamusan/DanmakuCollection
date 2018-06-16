"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyState_1 = require("./KeyState");
const MouseState_1 = require("./MouseState");
class Controller {
    constructor(document) {
        this.document = document;
        this.keyState = new KeyState_1.KeyState();
        this.mouseState = new MouseState_1.MouseState();
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
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map
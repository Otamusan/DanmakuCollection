"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyState {
    constructor() {
        this.keyAmount = 300;
        this.onKeyDown = (event) => {
            this.isPressed[event.keyCode] = true;
            this.isJustDown[event.keyCode] = true;
        };
        this.onKeyUp = (event) => {
            this.isPressed[event.keyCode] = false;
            this.isJustUp[event.keyCode] = true;
        };
        this.isPressed = new Array(this.keyAmount);
        this.isJustDown = new Array(this.keyAmount);
        this.isJustUp = new Array(this.keyAmount);
        this.isPressed.fill(false);
    }
    isKeyPressed(keyCode) {
        return this.isPressed[keyCode];
    }
    onUpdate() {
        for (let i = 0; i < this.isPressed.length; i++) {
        }
    }
}
KeyState.UP = 38;
KeyState.DOWN = 40;
KeyState.LEFT = 37;
KeyState.RIGHT = 39;
exports.KeyState = KeyState;
//# sourceMappingURL=KeyState.js.map
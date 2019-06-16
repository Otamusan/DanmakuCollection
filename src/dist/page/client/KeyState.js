"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyState {
    constructor() {
        this.keyAmount = 300;
        this.onKeyDown = (event) => {
            this.isPressed[event.keyCode] = true;
        };
        this.onKeyUp = (event) => {
            this.isPressed[event.keyCode] = false;
        };
        this.isPressed = new Array(this.keyAmount);
        this.isPressedWithTick = new Array(this.keyAmount);
        this.wasPressedWithTick = new Array(this.keyAmount);
        this.isJustDown = new Array(this.keyAmount);
        this.isJustUp = new Array(this.keyAmount);
        this.isPressed.fill(false);
    }
    isKeyPressed(keyCode) {
        return this.isPressedWithTick[keyCode];
    }
    isKeyUp(keyCode) {
        return this.isJustUp[keyCode];
    }
    isKeyDown(keyCode) {
        return this.isJustDown[keyCode];
    }
    onUpdate() {
        this.wasPressedWithTick = KeyState.arrayCopy(this.isPressedWithTick);
        this.isPressedWithTick = KeyState.arrayCopy(this.isPressed);
        //console.log(this.isJustDown[38],this.isJustUp[38])
        for (let i = 0; i < this.keyAmount; i++) {
            if (this.isPressedWithTick[i] && !this.wasPressedWithTick[i]) {
                this.isJustUp[i] = true;
            }
            else if (!this.isPressedWithTick[i] && this.wasPressedWithTick[i]) {
                this.isJustDown[i] = true;
            }
            else {
                this.isJustUp[i] = false;
                this.isJustDown[i] = false;
            }
        }
    }
    //配列の中身をシャロウコピーした配列を返す
    static arrayCopy(array) {
        let newarray = new Array(array.length);
        for (let i = 0; i < array.length; i++) {
            newarray[i] = array[i];
        }
        return newarray;
    }
}
KeyState.UP = 38;
KeyState.DOWN = 40;
KeyState.LEFT = 37;
KeyState.RIGHT = 39;
exports.KeyState = KeyState;
//# sourceMappingURL=KeyState.js.map
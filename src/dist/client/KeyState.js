//キー関係の管理
export class KeyState {
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
//# sourceMappingURL=KeyState.js.map
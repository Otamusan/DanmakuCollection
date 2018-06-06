import { KeyState } from './KeyState';
import { MouseState } from './MouseState';
export class Controller {
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
//# sourceMappingURL=Controller.js.map
import { KeyState } from './KeyState';
import { MouseState } from './MouseState';
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
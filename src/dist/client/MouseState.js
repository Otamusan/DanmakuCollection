import { Coord } from '../util/Coord';
//マウス関係の管理
export class MouseState {
    constructor() {
        this.buttonAmount = 3;
        this.mouseCoord = new Coord(0, 0);
        this.currentCoord = new Coord(0, 0);
        this.previousCoord = new Coord(0, 0);
        this.onMouseDown = (event) => {
            this.isPressed[event.button] = true;
        };
        this.onMouseUp = (event) => {
            this.isPressed[event.button] = false;
        };
        this.onMouseMove = (event) => {
            this.mouseCoord = new Coord(event.clientX, event.clientY);
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
//# sourceMappingURL=MouseState.js.map
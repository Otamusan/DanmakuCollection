"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("../common/Coord");
class MouseState {
    constructor() {
        this.buttonAmount = 3;
        this.mouseCoord = new Coord_1.Coord(0, 0);
        this.currentCoord = new Coord_1.Coord(0, 0);
        this.previousCoord = new Coord_1.Coord(0, 0);
        this.onMouseDown = (event) => {
            this.isPressed[event.button] = true;
        };
        this.onMouseUp = (event) => {
            this.isPressed[event.button] = false;
        };
        this.onMouseMove = (event) => {
            this.mouseCoord = new Coord_1.Coord(event.clientX, event.clientY);
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
exports.MouseState = MouseState;
//# sourceMappingURL=MouseState.js.map
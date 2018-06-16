import { Coord } from "../common/Coord";

export class MouseState {
    private isPressed: Array<boolean>;
    public static LEFT_BUTTON = 0;
    public static MIDDLE_BUTTON = 1;
    public static RIGHT_BUTTON = 2;
    private buttonAmount = 3

    private mouseCoord: Coord = new Coord(0, 0);
    private currentCoord: Coord = new Coord(0, 0);
    private previousCoord: Coord = new Coord(0, 0);

    constructor() {
        this.isPressed = new Array<boolean>(this.buttonAmount);
        this.isPressed.fill(false);
    }
    public onMouseDown = (event: MouseEvent) => {
        this.isPressed[event.button] = true;
    }

    public onMouseUp = (event: MouseEvent) => {
        this.isPressed[event.button] = false;
    }

    public onMouseMove = (event: MouseEvent) => {
        this.mouseCoord = new Coord(event.clientX, event.clientY);
    }

    public isMousePressed(botton: number): boolean {
        return this.isPressed[botton];
    }

    public onUpdate() {
        this.previousCoord = this.currentCoord;
        this.currentCoord = this.mouseCoord;
    }
    // 現在のマウスの座標
    public getCoord(): Coord {
        return this.currentCoord;
    }
    // 1フレーム前のマウスの座標
    public getPreviousCoord(): Coord {
        return this.previousCoord;
    }


}
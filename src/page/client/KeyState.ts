 //キー関係の管理
 export class KeyState {
    public static UP: number = 38;
    public static DOWN: number = 40;
    public static LEFT: number = 37;
    public static RIGHT: number = 39;
    private keyAmount = 300;
    private isPressed: Array<boolean>;
    constructor() {
        this.isPressed = new Array<boolean>(4000);
        this.isPressed.fill(false);
    }

    public onKeyDown = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = true;
    }

    public onKeyUp = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = false;
    }

    public isKeyPressed(keyCode: number): boolean {
        return this.isPressed[keyCode];
    }

    public onUpdate() {

    }
}
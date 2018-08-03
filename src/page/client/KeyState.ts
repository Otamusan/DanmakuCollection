export class KeyState {
    public static UP: number = 38;
    public static DOWN: number = 40;
    public static LEFT: number = 37;
    public static RIGHT: number = 39;
    private keyAmount = 300;
    private isPressed: Array<boolean>;
    private isJustUp: Array<boolean>;
    private isJustDown: Array<boolean>;

    constructor() {
        this.isPressed = new Array<boolean>(this.keyAmount);
        this.isJustDown = new Array<boolean>(this.keyAmount);
        this.isJustUp = new Array<boolean>(this.keyAmount);
        this.isPressed.fill(false);
    }

    public onKeyDown = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = true;
        this.isJustDown[event.keyCode] =true;
    }

    public onKeyUp = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = false;
        this.isJustUp[event.keyCode] = true;
    }

    public isKeyPressed(keyCode: number): boolean {
        return this.isPressed[keyCode];
    }

    public onUpdate() {
        for (let i = 0; i < this.isPressed.length; i++) {

        }
    }
}
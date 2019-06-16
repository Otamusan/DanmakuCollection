export class KeyState {
    public static UP: number = 38;
    public static DOWN: number = 40;
    public static LEFT: number = 37;
    public static RIGHT: number = 39;
    private keyAmount = 300;
    private isPressed: Array<boolean>;
    private isPressedWithTick: Array<boolean>; //変更をonUpdateでするための受け皿
    private wasPressedWithTick: Array<boolean>; //isPressedWithTickの1tick前の状態
    private isJustUp: Array<boolean>; //キーが上がった1tickのみtrue
    private isJustDown: Array<boolean>; //キーが下がった1tickのみtrue

    constructor() {
        this.isPressed = new Array<boolean>(this.keyAmount);
        this.isPressedWithTick = new Array<boolean>(this.keyAmount);
        this.wasPressedWithTick = new Array<boolean>(this.keyAmount);
        this.isJustDown = new Array<boolean>(this.keyAmount);
        this.isJustUp = new Array<boolean>(this.keyAmount);
        this.isPressed.fill(false);
    }

    public onKeyDown = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = true;
    }

    public onKeyUp = (event: KeyboardEvent) => {
        this.isPressed[event.keyCode] = false;
    }

    public isKeyPressed(keyCode: number): boolean {
        return this.isPressedWithTick[keyCode];
    }

    public isKeyUp(keyCode: number): boolean {
        return this.isJustUp[keyCode];
    }

    public isKeyDown(keyCode: number): boolean {
        return this.isJustDown[keyCode];
    }

    public onUpdate() {
        this.wasPressedWithTick = KeyState.arrayCopy<boolean>(this.isPressedWithTick);
        this.isPressedWithTick = KeyState.arrayCopy<boolean>(this.isPressed);
        //console.log(this.isJustDown[38],this.isJustUp[38])
        for (let i = 0; i < this.keyAmount; i++) {
            if (this.isPressedWithTick[i] && !this.wasPressedWithTick[i]){
                this.isJustUp[i]=true;
            }else if(!this.isPressedWithTick[i] && this.wasPressedWithTick[i]){
                this.isJustDown[i]=true;
            }else{
                this.isJustUp[i]=false;
                this.isJustDown[i]=false;
            }
        }
    }

    //配列の中身をシャロウコピーした配列を返す
    public static arrayCopy<T>(array :Array<T>):Array<T>{
        let newarray = new Array<T>(array.length);
        for (let i = 0; i < array.length; i++) {
            newarray[i] = array[i];
        }
        return newarray;
    }
}
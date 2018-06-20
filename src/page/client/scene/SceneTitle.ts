import { Scene } from './Scene';
import { Client } from '../Client';
import { MouseState } from '../MouseState';
import { SceneConnect } from './SceneConnect';
export class SceneTitle extends Scene {
    private connect: SceneConnect;
    constructor(client: Client, div: HTMLDivElement) {
        super(client, div);
        this.connect = new SceneConnect(client, client.divManager.getDivCopy("connect"));
    }

    public onUpdate() {
        if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
            this.transitionSubState(this.connect);
        }
    }
}
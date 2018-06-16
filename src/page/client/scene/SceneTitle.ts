import { Scene } from './Scene';
import { Client } from '../Client';
import { SceneGame } from './SceneGame';
import { MouseState } from '../MouseState';
export class SceneTitle extends Scene {
    private game: Scene;
    constructor(client: Client, div: HTMLDivElement) {
        super(client, div);
        this.game = new SceneGame(client, client.divManager.getDivCopy("game"));
    }

    public onUpdate() {
        if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
            this.transitionSubState(this.game);
        }
    }
}
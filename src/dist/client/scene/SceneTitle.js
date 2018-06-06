import { Scene } from "./Scene";
import { SceneGame } from './SceneGame';
import { MouseState } from '../MouseState';
export class SceneTitle extends Scene {
    constructor(client, div) {
        super(client, div);
        this.game = new SceneGame(client, client.divManager.getDivCopy("game"));
    }
    onUpdate() {
        if (this.getMouse().isMousePressed(MouseState.LEFT_BUTTON)) {
            this.transitionSubScene(this.game);
        }
    }
}
//# sourceMappingURL=SceneTitle.js.map
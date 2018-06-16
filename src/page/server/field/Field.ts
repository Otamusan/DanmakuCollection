import { StateTree } from "../../common/StateTree";
import { PlayerManager } from "../PlayerManager";
import { Player } from "../Player";

export class Field extends StateTree {
    public playerManager: PlayerManager
    constructor(parent?: Field) {
        super(parent);
        this.playerManager = new PlayerManager();
    }

    public transitionSubState(subState: StateTree) {
        if (!(subState instanceof Field)) return;
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }

    public canLogin(play: Player): boolean {
        return true;
    }

    public Login(player: Player) {
        this.playerManager.Login(player);
    }
}
import { StateTree } from "../../common/StateTree";
import { PlayerManager } from "../PlayerManager";
import { Player } from '../Player';

export class Field extends StateTree {
    public playerList :Array<Player>;
    constructor(parent?: Field) {
        super(parent);
        this.playerList = new Array;
    }

    public transitionSubState(subState: StateTree) {
        if (!(subState instanceof Field)) return;
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }

    public canLogin(play: Player): boolean {
        return true;
    }

    public onPlayerLogined(player :Player){}

    public addPlayer(player:Player){
        this.playerList.push(player);
        player.field=this;
        this.onPlayerLogined(player)
    }
}
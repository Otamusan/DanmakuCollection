import { StateTree } from "../../common/StateTree";
import { PlayerManager } from "../PlayerManager";
import { Player } from '../Player';
import { Entity } from "../entity/Entity";

export class Field extends StateTree {
    public playerList :Array<Player>;
    public EntityList: Array<Entity>;

    constructor(parent?: Field) {
        super(parent);
        this.playerList = new Array;
        this.EntityList = new Array<Entity>();
    }

    public onPlayerLogined(player: Player){}

    public spawnEntity(entity:Entity){
        this.EntityList.push(entity);
    }

    public onUpdate() {
        this.EntityList.forEach((entity, i) => {
            entity.onUpdate();
            if (entity.isDead) {
                this.EntityList[i] = null;
            }
        });
    }

    public transitionSubState(subState: StateTree) {
        if (!(subState instanceof Field)) return;
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }

    public canLogin(play: Player): boolean {
        return true;
    }

    public addPlayer(player:Player){
        this.playerList.push(player);
        player.field=this;
        this.onPlayerLogined(player);
        console.log(player)
    }
}
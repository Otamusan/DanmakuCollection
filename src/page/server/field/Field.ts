import { StateTree } from "../../common/StateTree";
import { PlayerManager } from "../PlayerManager";
import { Player } from '../Player';
import { Entity } from "../entity/Entity";
import { EntityManager } from './EntityManager';

export class Field extends StateTree {
    public playerList :Array<Player>;
    private entityManager:EntityManager;
    constructor(parent?: Field) {
        super(parent);
        this.entityManager = new EntityManager();
        this.playerList = new Array;
    }

    public getEntityManager():EntityManager{
        return this.entityManager;
    }

    public onPlayerLogined(player: Player){}

    public onUpdate() {
        this.entityManager.onUpdate();
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
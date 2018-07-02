import { Field } from "./Field";
import { Entity } from '../entity/Entity';
import { Player } from "../Player";
import { EntityPlayer } from '../entity/EntityPlayer';

export class FieldGame extends Field {
    public EntityList: Array<Entity>;
    constructor(parent?: Field) {
        super(parent);
        this.EntityList = new Array<Entity>();
    }

    public onPlayerLogined(player: Player){
        let entityPlayer = new EntityPlayer(player,100);
        this.spawnEntity(entityPlayer);
    }

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
}
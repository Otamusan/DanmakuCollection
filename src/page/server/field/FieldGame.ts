import { Field } from "./Field";
import { Entity } from '../entity/Entity';
import { Player } from "../Player";
import { EntityPlayer } from '../entity/EntityPlayer';

export class FieldGame extends Field {
    public onPlayerLogined(player: Player){
        let entityPlayer = new EntityPlayer(this,player,1000);
        this.spawnEntity(entityPlayer);
    }
}
import { Field } from "./Field";
import { Entity } from '../entity/Entity';
import { Player } from "../Player";
import { EntityPlayer } from '../entity/EntityPlayer';
import { EntityManager } from './EntityManager';

export class FieldGame extends Field {
    public onPlayerLogined(player: Player){
        let entityPlayer = new EntityPlayer(this.getEntityManager(),player,1000);
        this.getEntityManager().spawnEntity(entityPlayer);
    }
}
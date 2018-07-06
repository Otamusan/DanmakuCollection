import { EntityLiving } from "./EntityLiving";
import { Field } from "../field/Field";

export class EntityBullet extends EntityLiving{
    constructor(field:Field,maxhp:number){
        super(field,maxhp);
    }

    onUpdate(){
        super.onUpdate()
        this.hp--;
    }
}
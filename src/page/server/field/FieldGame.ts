import { Field } from "./Field";
import { Entity } from "../entity/Entity";

export class FieldGame extends Field {
    public EntityList: Array<Entity>;
    constructor(parent?: Field) {
        super(parent);
        this.EntityList = new Array<Entity>();

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
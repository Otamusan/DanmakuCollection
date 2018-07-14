import { Entity } from "./Entity";
import { Coord } from "../../common/Coord";
import { Field } from "../field/Field";

export class EntityLiving extends Entity {
    public hp: number;
    public maxHp: number;
    constructor(field:Field,maxHp: number) {
        super(field);
        this.maxHp = maxHp;
        this.hp = maxHp;
    }

    public onUpdate() {
        super.onUpdate();
    }

    public addDamaged(n: number) {
        this.hp -= n;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    public getHP(): number {
        return this.hp
    }

    public getMaxHP(): number {
        return this.maxHp;
    }
}
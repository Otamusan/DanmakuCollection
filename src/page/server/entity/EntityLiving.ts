import { Entity } from "./Entity";
import { Coord } from "../../common/Coord";
import { Field } from "../field/Field";
import { EntityManager } from "../field/EntityManager";

export class EntityLiving extends Entity {
    public hp: number;
    public maxHp: number;
    constructor(entityManager:EntityManager,maxHp: number) {
        super(entityManager);
        this.maxHp = maxHp;
        this.hp = maxHp;
    }

    public onUpdate() {
        if (this.hp<=0){
            this.setDead();
        }
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
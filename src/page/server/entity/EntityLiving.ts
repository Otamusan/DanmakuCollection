import { Entity } from "./Entity";
import { Coord } from "../../common/Coord";

export class EntityLiving extends Entity {
    public vector: Coord;
    public hp: number;
    private maxHp: number;
    constructor(maxHp: number) {
        super();
        this.maxHp = maxHp;
        this.hp = maxHp;
    }

    public onUpdate() {
        this.coord.addCoord(this.vector.copy())
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

    public getVector(): Coord {
        return this.coord;
    }
}
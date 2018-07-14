import { Coord } from "../../common/Coord";
import { Field } from "../field/Field";

export class Entity {
    public coord: Coord;
    public isDead: boolean;

    public field: Field;
    constructor(field: Field) {
        this.coord = new Coord(0,0);
        this.field = field;
    }

    public onUpdate() {
    }

    public onSpawned(){}

    public getCoord(): Coord {
        return this.coord.copy();
    }

    public setCoord(coord: Coord) {
        this.coord = coord.copy();
    }

    public setDead() {
        this.isDead = true;
    }
}
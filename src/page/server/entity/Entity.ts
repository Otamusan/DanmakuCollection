import { Coord } from "../../common/Coord";

export class Entity {
    public coord: Coord;
    public isDead: boolean
    constructor() {
    }

    public onUpdate() {
    }

    public getCoord(): Coord {
        return this.coord;
    }

    public setCoord(coord: Coord) {
        this.coord = coord;
    }

    public setDead() {
        this.isDead = true;
    }
}
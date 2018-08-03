import { Coord } from '../../common/Coord';
import { Field } from "../field/Field";
import { EntityManager } from '../field/EntityManager';

export class Entity {
    public coord: Coord;
    public prevCoord: Coord;
    public isDead: boolean;

    public entityManager: EntityManager;
    constructor(entityManager: EntityManager) {
        this.coord = new Coord(0,0);
        this.entityManager = entityManager;
    }

    public onUpdate() {
    }

    public onSpawned(){}

    public getCoord(): Coord {
        return this.coord.copy();
    }

    public getCoordReference():Coord{
        return this.coord;
    }

    public setCoord(coord: Coord) {
        this.coord = coord.copy();
    }

    public setDead() {
        this.isDead = true;
    }
}
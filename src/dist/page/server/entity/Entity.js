"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("../../common/Coord");
class Entity {
    constructor(field) {
        this.coord = new Coord_1.Coord(0, 0);
        this.field = field;
    }
    onUpdate() {
    }
    onSpawned() { }
    getCoord() {
        return this.coord.copy();
    }
    setCoord(coord) {
        this.coord = coord.copy();
    }
    setDead() {
        this.isDead = true;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map
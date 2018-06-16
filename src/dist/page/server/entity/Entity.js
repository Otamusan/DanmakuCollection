"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    constructor() {
    }
    onUpdate() {
    }
    getCoord() {
        return this.coord;
    }
    setCoord(coord) {
        this.coord = coord;
    }
    setDead() {
        this.isDead = true;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map
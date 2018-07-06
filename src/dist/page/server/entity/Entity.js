"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("../../common/Coord");
class Entity {
    constructor(field) {
        this.coord = new Coord_1.Coord(0, 0);
        this.speed = new Coord_1.Coord(0, 0);
        this.acceleration = new Coord_1.Coord(0, 0);
        this.force = new Coord_1.Coord(0, 0);
        this.speedLimit = 0;
        this.k = 0;
        this.field = field;
        this.weight = 1;
    }
    addForce(f) {
        this.force.addCoord(f.copy());
    }
    onUpdate() {
        this.coord.addCoord(this.speed.copy());
        this.speed.addCoord(this.acceleration.copy());
        if (this.speed.getLength() != 0) {
            this.speed.subtractCoord(this.speed.copy().multiply(this.k));
        }
        this.acceleration = this.force.copy().divide(this.weight);
        this.force.x = 0;
        this.force.y = 0;
        if (this.speedLimit != 0 && this.speed.getLength() > this.speedLimit) {
            this.speed.setLength(this.speedLimit);
        }
    }
    getSpeed() {
        return this.speed.copy();
    }
    setSpeed(speed) {
        this.speed = speed.copy();
    }
    getCoord() {
        return this.coord.copy();
    }
    setCoord(coord) {
        this.coord = coord.copy();
    }
    getAcceleration() {
        return this.acceleration.copy();
    }
    setAcceleration(acceleration) {
        this.acceleration = acceleration.copy();
    }
    setDead() {
        this.isDead = true;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map
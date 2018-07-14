"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("../../common/Coord");
class PhysicsHelper {
    constructor() {
        this.speed = new Coord_1.Coord(0, 0);
        this.acceleration = new Coord_1.Coord(0, 0);
        this.force = new Coord_1.Coord(0, 0);
        this.speedLimit = 0;
        this.weight = 1;
        this.k = 0;
    }
    addForce(f) {
        this.force.addCoord(f.copy());
    }
    onUpdate() {
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
    //実際に動かす時はこっちを使う
    setTransitionToCoord(coord) {
        coord.addCoord(this.speed);
    }
    getSpeed() {
        return this.speed.copy();
    }
    setSpeed(speed) {
        this.speed = speed.copy();
    }
    getAcceleration() {
        return this.acceleration.copy();
    }
    setAcceleration(acceleration) {
        this.acceleration = acceleration.copy();
    }
}
exports.PhysicsHelper = PhysicsHelper;
//# sourceMappingURL=PhysicsHelper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bmodi {
    constructor(time, hp, speed, angle, spanwTime) {
        this.maxTimeDifference = time;
        this.maxHPDifference = hp;
        this.speedDifference = speed;
        this.angleDifference = angle;
        this.spawnTimeDifference = spanwTime;
    }
    getMaxTimeDifference() {
        return this.maxTimeDifference;
    }
    getSpeedDifference() {
        return this.speedDifference;
    }
    getMaxHPDifference() {
        return this.maxHPDifference;
    }
    getAngleDifference() {
        return this.angleDifference;
    }
    getSpawnTimeDifference() {
        return this.spawnTimeDifference;
    }
}
exports.Bmodi = Bmodi;
//# sourceMappingURL=BModi.js.map
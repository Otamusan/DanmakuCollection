"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BarrageModification {
    constructor(time, hp, speed, angle) {
        this.maxTimeDifference = time;
        this.maxHPDifference = hp;
        this.speedDifference = speed;
        this.angleDifference = angle;
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
}
exports.BarrageModification = BarrageModification;
//# sourceMappingURL=BarrageModification.js.map
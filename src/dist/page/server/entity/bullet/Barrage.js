"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Barrage {
    constructor(base, amount, modification) {
        this.base = base;
        this.amount = amount;
        this.modification = modification;
        this.totalCost = 0;
        this.bulletList = new Array(this.amount);
        for (let i = 0; i < this.amount; i++) {
            let time = base.getMaxTime() + i * modification.getMaxTimeDifference();
            let hp = base.getMaxHP() + i * modification.getMaxHPDifference();
            let speed = base.getSpeed() + i * modification.getSpeedDifference();
            this.bulletList[i] = base.modifiedCopy(time, hp, speed);
            this.totalCost += this.bulletList[i].getCost();
        }
    }
    getSpeed() {
        return this.base.getSpeed();
    }
    getMaxHP() {
        return this.base.getMaxHP();
    }
    getMaxTime() {
        return this.base.getMaxTime();
    }
    getCost() {
        return this.totalCost;
    }
    spawn(entitymanager, coord, angle, spawnTime) {
        let maxAngle = this.modification.getAngleDifference() * this.bulletList.length;
        for (let i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].spawn(entitymanager, coord, angle + i * this.modification.getAngleDifference() - maxAngle / 2, spawnTime + i * this.modification.getSpawnTimeDifference());
        }
    }
    copy() {
        return new Barrage(this.base.copy(), this.amount, this.modification);
    }
    modifiedCopy(time, hp, speed) {
        return new Barrage(this.base.modifiedCopy(time, hp, speed), this.amount, this.modification);
    }
}
exports.Barrage = Barrage;
//# sourceMappingURL=Barrage.js.map
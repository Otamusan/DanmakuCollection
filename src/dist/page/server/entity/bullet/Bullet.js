"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bullet {
    constructor(time, hp, speed) {
        this.maxTime = time;
        this.maxHp = hp;
        this.speed = speed;
    }
    getSpeed() {
        return this.speed;
    }
    getMaxHP() {
        return this.maxHp;
    }
    getMaxTime() {
        return this.maxTime;
    }
    getCost() {
        return this.speed * this.maxHp * this.maxTime + this.baseCost;
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map
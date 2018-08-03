"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coord_1 = require("../../../common/Coord");
const EntityBullet_1 = require("./EntityBullet");
class Bullet {
    constructor(time, hp, speed) {
        this.baseCost = 10;
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
    spawn(entitymanager, coord, angle, spawntime) {
        let bullet = new EntityBullet_1.EntityBullet(entitymanager, this);
        bullet.physics.setSpeed(Coord_1.Coord.createFromAngle(angle, this.speed));
        if (spawntime != 0) {
            entitymanager.spawnEntityWithLag(bullet, spawntime, coord);
        }
        else {
            bullet.setCoord(coord);
            entitymanager.spawnEntity(bullet);
        }
    }
    copy() {
        return new Bullet(this.maxTime, this.maxHp, this.speed);
    }
    modifiedCopy(time, hp, speed) {
        return new Bullet(time, hp, speed);
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map
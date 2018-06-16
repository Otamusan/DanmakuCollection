"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//パーティクルの実装部分(Bridgeパターン)
class Particle {
    constructor(color, vector, coord, size, remain, pFunc, shape, radian, alpha) {
        this.color = color;
        this.vector = vector;
        this.coord = coord;
        this.size = size;
        this.remain = remain;
        this.shape = shape;
        this.pFunc = pFunc;
        this.time = 0;
        this.radian = radian;
        this.alpha = alpha;
    }
    onUpdate() {
        this.pFunc.onSystemUpdate(this);
        this.time++;
        this.coord.addCoord(this.vector);
        if (this.time >= this.remain) {
            this.setDead();
        }
    }
    setDead() {
        this.isDead = true;
    }
    isParticleDead() {
        return this.isDead;
    }
    getAlpha() {
        return this.alpha;
    }
    setAlpha(alpha) {
        this.alpha = alpha;
    }
    getRad() {
        return this.radian;
    }
    setRad(rad) {
        this.radian = rad;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getVector() {
        return this.vector;
    }
    setVector(vector) {
        this.vector = vector;
    }
    getCoord() {
        return this.coord;
    }
    setCoord(coord) {
        this.coord = coord;
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }
    getRemain() {
        return this.remain;
    }
    getTime() {
        return this.time;
    }
    getShape() {
        return this.shape;
    }
}
exports.Particle = Particle;
//# sourceMappingURL=Particle.js.map
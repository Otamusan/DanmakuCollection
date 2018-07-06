"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static createFromRadian(rad, length) {
        let x = Math.cos(rad) * length;
        let y = Math.sin(rad) * length;
        return new Coord(x, y);
    }
    getRadian() {
        return Math.atan2(this.x, this.y);
    }
    getDistance(otherCoord) {
        return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
    }
    getLength() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    isEqual(other) {
        return other.x == this.x && other.y == this.y;
    }
    copy() {
        return new Coord(this.x, this.y);
    }
    getUnitVector() {
        return this.copy().divide(this.copy().getLength());
    }
    setLength(n) {
        this.x = this.copy().getUnitVector().multiply(n).x;
        this.y = this.copy().getUnitVector().multiply(n).y;
        return this;
    }
    subtractCoord(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    divide(d) {
        this.x /= d;
        this.y /= d;
        return this;
    }
    addCoord(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    multiply(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    addUp(n) {
        this.y -= n;
        return this;
    }
    addDown(n) {
        this.y += n;
        return this;
    }
    addRight(n) {
        this.x += n;
        return this;
    }
    addLeft(n) {
        this.x -= n;
        return this;
    }
}
exports.Coord = Coord;
//# sourceMappingURL=Coord.js.map
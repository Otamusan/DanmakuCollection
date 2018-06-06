export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static createFromRadian(rad, length) {
        let x = Math.cos(rad) * length;
        let y = Math.sin(rad) * length;
        return new Coord(x, y);
    }
    getDistance(otherCoord) {
        return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
    }
    isEqual(other) {
        return other.x == this.x && other.y == this.y;
    }
    copy() {
        return new Coord(this.x, this.y);
    }
    addCoord(other) {
        this.x += other.x;
        this.y += other.y;
    }
    addUp(n) {
        this.y -= n;
    }
    addDown(n) {
        this.y += n;
    }
    addRight(n) {
        this.x += n;
    }
    addLeft(n) {
        this.x -= n;
    }
}
//# sourceMappingURL=Coord.js.map
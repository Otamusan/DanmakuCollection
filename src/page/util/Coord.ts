export class Coord {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static createFromRadian(rad: number, length: number): Coord {
        let x = Math.cos(rad) * length;
        let y = Math.sin(rad) * length;
        return new Coord(x, y);
    }

    public getDistance(otherCoord: Coord): number {
        return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
    }

    public isEqual(other: Coord): boolean {
        return other.x == this.x && other.y == this.y;
    }

    public copy(): Coord {
        return new Coord(this.x, this.y);
    }

    public addCoord(other: Coord) {
        this.x += other.x;
        this.y += other.y;
    }

    public addUp(n: number) {
        this.y -= n
    }

    public addDown(n: number) {
        this.y += n
    }

    public addRight(n: number) {
        this.x += n
    }

    public addLeft(n: number) {
        this.x -= n
    }
}
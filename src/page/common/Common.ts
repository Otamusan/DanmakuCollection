export namespace Common {
    export class StateTree {
        public parentState: StateTree;
        public currentSubState: StateTree;
        constructor(parentState?: StateTree) {
            this.currentSubState = null
            if (parentState == undefined) {
                this.parentState = null;
            } else {
                this.parentState = parentState;
            }
        }

        public onSystemUpdate() {
            if (this.currentSubState != null) {
                this.currentSubState.onSystemUpdate();
                return;
            }
            this.onUpdate();
        }

        //オーバーライド用
        public onUpdate() {

        }

        //子ステートへ移行
        public transitionSubState(subState: StateTree) {
            this.currentSubState = subState;
            this.currentSubState.onTransitionedParentState(this);
        }

        //親ステートから移行されたときに呼び出される
        public onTransitionedParentState(parentState: StateTree) {
        }

        //親ステートへ戻る
        public returnParentState() {
            this.parentState.currentSubState = null;
            this.parentState.onReturnedFromSubState(this);
        }

        //子ステートから戻ってきたときに呼び出される
        public onReturnedFromSubState(subState: StateTree) {
        }
    }

    export class Color {
        private r: number;
        private g: number;
        private b: number;

        constructor(r: number, g: number, b: number) {
            if (r > 255) {
                this.r = 255;
            } else {
                this.r = r;
            }
            if (g > 255) {
                this.g = 255;
            } else {
                this.g = g;
            }
            if (b > 255) {
                this.b = 255;
            } else {
                this.b = b;
            }
        }
        // hは0から359まで
        // sは0から1まで
        // vは0から1まで
        public static createFromHSV(h: number, s: number, v: number) {
            let c = v * s;
            let Hp = h / 60;
            let x = c * (1 - Math.abs(Hp % 2 - 1));
            let r;
            let g;
            let b;
            if (0 <= Hp && Hp < 1) {
                r = c; g = x; b = 0;
            }
            if (1 <= Hp && Hp < 2) {
                r = x; g = c; b = 0;
            }
            if (2 <= Hp && Hp < 3) {
                r = 0; g = c; b = x;
            }
            if (3 <= Hp && Hp < 4) {
                r = 0; g = x; b = c;
            }
            if (4 <= Hp && Hp < 5) {
                r = x; g = 0; b = c;
            }
            if (5 <= Hp && Hp < 6) {
                r = c; g = 0; b = x;
            }
            var m = v - c;
            r += m; g += m; b += m
            r = Math.floor(r * 255);
            g = Math.floor(g * 255);
            b = Math.floor(b * 255);
            return new Color(r, g, b);
        }

        public getString(): string {
            let r = Math.floor(this.r).toString(16)
            let g = Math.floor(this.g).toString(16)
            let b = Math.floor(this.b).toString(16)
            if (r.length == 1) { r = "0" + r }
            if (g.length == 1) { g = "0" + g }
            if (b.length == 1) { b = "0" + b }


            return "#" + r + g + b;
        }

        public getR() {
            return this.r
        }

        public getG() {
            return this.g
        }

        public getB() {
            return this.b
        }

    }


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

        public subtractCoord(other: Coord): Coord {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        }

        public addCoord(other: Coord): Coord {
            this.x += other.x;
            this.y += other.y;
            return this;
        }

        public multiplyCoord(n: number): Coord {
            this.x *= n;
            this.y *= n;
            return this;
        }

        public addUp(n: number): Coord {
            this.y -= n;
            return this;
        }

        public addDown(n: number): Coord {
            this.y += n;
            return this;
        }

        public addRight(n: number): Coord {
            this.x += n;
            return this;
        }

        public addLeft(n: number): Coord {
            this.x -= n;
            return this;
        }
    }
}
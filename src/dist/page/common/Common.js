"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common;
(function (Common) {
    class StateTree {
        constructor(parentState) {
            this.currentSubState = null;
            if (parentState == undefined) {
                this.parentState = null;
            }
            else {
                this.parentState = parentState;
            }
        }
        onSystemUpdate() {
            if (this.currentSubState != null) {
                this.currentSubState.onSystemUpdate();
                return;
            }
            this.onUpdate();
        }
        //オーバーライド用
        onUpdate() {
        }
        //子ステートへ移行
        transitionSubState(subState) {
            this.currentSubState = subState;
            this.currentSubState.onTransitionedParentState(this);
        }
        //親ステートから移行されたときに呼び出される
        onTransitionedParentState(parentState) {
        }
        //親ステートへ戻る
        returnParentState() {
            this.parentState.currentSubState = null;
            this.parentState.onReturnedFromSubState(this);
        }
        //子ステートから戻ってきたときに呼び出される
        onReturnedFromSubState(subState) {
        }
    }
    Common.StateTree = StateTree;
    class Color {
        constructor(r, g, b) {
            if (r > 255) {
                this.r = 255;
            }
            else {
                this.r = r;
            }
            if (g > 255) {
                this.g = 255;
            }
            else {
                this.g = g;
            }
            if (b > 255) {
                this.b = 255;
            }
            else {
                this.b = b;
            }
        }
        // hは0から359まで
        // sは0から1まで
        // vは0から1まで
        static createFromHSV(h, s, v) {
            let c = v * s;
            let Hp = h / 60;
            let x = c * (1 - Math.abs(Hp % 2 - 1));
            let r;
            let g;
            let b;
            if (0 <= Hp && Hp < 1) {
                r = c;
                g = x;
                b = 0;
            }
            if (1 <= Hp && Hp < 2) {
                r = x;
                g = c;
                b = 0;
            }
            if (2 <= Hp && Hp < 3) {
                r = 0;
                g = c;
                b = x;
            }
            if (3 <= Hp && Hp < 4) {
                r = 0;
                g = x;
                b = c;
            }
            if (4 <= Hp && Hp < 5) {
                r = x;
                g = 0;
                b = c;
            }
            if (5 <= Hp && Hp < 6) {
                r = c;
                g = 0;
                b = x;
            }
            var m = v - c;
            r += m;
            g += m;
            b += m;
            r = Math.floor(r * 255);
            g = Math.floor(g * 255);
            b = Math.floor(b * 255);
            return new Color(r, g, b);
        }
        getString() {
            let r = Math.floor(this.r).toString(16);
            let g = Math.floor(this.g).toString(16);
            let b = Math.floor(this.b).toString(16);
            if (r.length == 1) {
                r = "0" + r;
            }
            if (g.length == 1) {
                g = "0" + g;
            }
            if (b.length == 1) {
                b = "0" + b;
            }
            return "#" + r + g + b;
        }
        getR() {
            return this.r;
        }
        getG() {
            return this.g;
        }
        getB() {
            return this.b;
        }
    }
    Common.Color = Color;
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
        getDistance(otherCoord) {
            return Math.sqrt(Math.pow(this.x - otherCoord.x, 2) + Math.pow(this.y - otherCoord.y, 2));
        }
        isEqual(other) {
            return other.x == this.x && other.y == this.y;
        }
        copy() {
            return new Coord(this.x, this.y);
        }
        subtractCoord(other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        }
        addCoord(other) {
            this.x += other.x;
            this.y += other.y;
            return this;
        }
        multiplyCoord(n) {
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
    Common.Coord = Coord;
})(Common = exports.Common || (exports.Common = {}));
//# sourceMappingURL=Common.js.map
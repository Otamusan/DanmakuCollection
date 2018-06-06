export class Color {
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
//# sourceMappingURL=Color.js.map
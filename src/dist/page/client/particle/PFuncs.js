"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PFuncAccelerate_1 = require("./PFuncAccelerate");
const PFuncFade_1 = require("./PFuncFade");
const PFuncGravity_1 = require("./PFuncGravity");
const PFuncShrink_1 = require("./PFuncShrink");
const PFuncRotate_1 = require("./PFuncRotate");
var PFuncs;
(function (PFuncs) {
    //1.1倍に加速
    PFuncs.ACCELERATE1_1 = new PFuncAccelerate_1.PFuncAccelerate(null, 1.1);
    //0.9倍に加速
    PFuncs.DECELERATION1_1 = new PFuncAccelerate_1.PFuncAccelerate(null, 0.9);
    //時間が経つと薄くなる
    PFuncs.FADE = new PFuncFade_1.PFuncFade(null);
    //下に向かって1.1倍に加速
    PFuncs.GRAVITY = new PFuncGravity_1.PFuncGravity(null, 0.1);
    //時間が経つと小さくなる
    PFuncs.SHRINK = new PFuncShrink_1.PFuncShrink(null);
    //１tickに1度回転
    PFuncs.ROTATE = new PFuncRotate_1.PFuncRotate(null, 1);
})(PFuncs = exports.PFuncs || (exports.PFuncs = {}));
//# sourceMappingURL=PFuncs.js.map
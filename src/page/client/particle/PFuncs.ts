import { PFunc } from './PFunc';
import { PFuncAccelerate } from './PFuncAccelerate';
import { PFuncFade } from './PFuncFade';
import { PFuncGravity } from './PFuncGravity';
import { PFuncShrink } from './PFuncShrink';
import { PFuncRotate } from './PFuncRotate';
export namespace PFuncs {
    //1.1倍に加速
    export const ACCELERATE1_1: PFunc = new PFuncAccelerate(null, 1.1);
    //0.9倍に加速
    export const DECELERATION1_1: PFunc = new PFuncAccelerate(null, 0.9);
    //時間が経つと薄くなる
    export const FADE: PFunc = new PFuncFade(null);
    //下に向かって1.1倍に加速
    export const GRAVITY: PFunc = new PFuncGravity(null, 0.1);
    //時間が経つと小さくなる
    export const SHRINK: PFunc = new PFuncShrink(null);
    //１tickに1度回転
    export const ROTATE: PFunc = new PFuncRotate(null, 1);
}
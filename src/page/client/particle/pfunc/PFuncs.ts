import { PFunc } from './PFunc';
import { PFuncAccelerate } from './PFuncAccelerate';
import { PFuncFade } from './PFuncFade';
import { PFuncGravity } from './PFuncGravity';
import { PFuncShrink } from './PFuncShrink';
import { PFuncRotate } from './PFuncRotate';
export class PFuncs {
    //1.1倍に加速
    public static ACCELERATE1_1: PFunc = new PFuncAccelerate(1.1);
    //0.9倍に加速
    public static DECELERATION1_1: PFunc = new PFuncAccelerate(0.9);
    //時間がたつと薄くなる
    public static FADE: PFunc = new PFuncFade();
    //下に向かって1.1倍に加速
    public static GRAVITY: PFunc = new PFuncGravity(0.1);
    //時間が経つと小さくなる
    public static SHRINK: PFunc = new PFuncShrink();
    //１tickに1度回転
    public static ROTATE: PFunc = new PFuncRotate(1);
}
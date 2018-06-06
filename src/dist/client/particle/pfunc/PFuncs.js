import { PFuncAccelerate } from './PFuncAccelerate';
import { PFuncFade } from './PFuncFade';
import { PFuncGravity } from './PFuncGravity';
import { PFuncShrink } from './PFuncShrink';
import { PFuncRotate } from './PFuncRotate';
export class PFuncs {
}
//1.1倍に加速
PFuncs.ACCELERATE1_1 = new PFuncAccelerate(1.1);
//0.9倍に加速
PFuncs.DECELERATION1_1 = new PFuncAccelerate(0.9);
//時間がたつと薄くなる
PFuncs.FADE = new PFuncFade();
//下に向かって1.1倍に加速
PFuncs.GRAVITY = new PFuncGravity(0.1);
//時間が経つと小さくなる
PFuncs.SHRINK = new PFuncShrink();
//１tickに1度回転
PFuncs.ROTATE = new PFuncRotate(1);
//# sourceMappingURL=PFuncs.js.map
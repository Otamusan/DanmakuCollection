import { EntityLiving } from "../EntityLiving";
import { PhysicsHelper } from "../PhysicsHelper";
import { Field } from "../../field/Field";
import { BulletState } from "./BulletState";


export class EntityBullet extends EntityLiving{
    public physics: PhysicsHelper;
    public state: Symbol;
    public time: number;//スポーンしてから立ったtick数
    public maxTime: number;//存在できるtick数
    public fadeHPRate: number;//fade状態になった時のHPの減少する割合
    public fadeSpeedRate: number;//fade状態になった時の速度の減少の割合

    constructor(field:Field,maxhp:number){
        super(field,maxhp);
        this.physics = new PhysicsHelper();
        this.time =0;
        this.maxTime = 15;
        this.fadeHPRate = 0.4;
        this.fadeSpeedRate =0.5;
    }

    public onUpdate(){
        super.onUpdate();
        this.time++;
        if (this.time>=this.maxTime){
            this.state = BulletState.FADE;
        }
        if (this.state == BulletState.FADE){
            this.hp-=this.hp*this.fadeHPRate
            this.physics.speed.multiply(this.fadeSpeedRate);
        }
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
    }

    public onSpawned(){
        this.state = BulletState.NORMAL
    }

}
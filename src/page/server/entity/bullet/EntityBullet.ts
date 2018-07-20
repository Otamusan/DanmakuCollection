import { EntityLiving } from "../EntityLiving";
import { PhysicsHelper } from "../PhysicsHelper";
import { Field } from "../../field/Field";
import { BulletState } from "./BulletState";
import { Bullet } from './Bullet';


export class EntityBullet extends EntityLiving{
    public physics: PhysicsHelper;
    public state: Symbol;
    public time: number;//スポーンしてから立ったtick数
    public maxTime: number;//存在できるtick数
    public fadeHPRate: number;//fade状態になった時のHPの減少する割合
    public fadeSpeedRate: number;//fade状態になった時の速度の減少の割合
    public bullet: Bullet
    constructor(field:Field,bullet:Bullet){
        super(field,bullet.getMaxHP());
        this.bullet = bullet;
        this.physics = new PhysicsHelper();
        this.time =0;
        this.fadeHPRate = 0.4;
        this.fadeSpeedRate =0.5;
        this.physics.k=0;
        this.physics.setSpeed(this.bullet.getSpeed());
    }

    public onUpdate(){
        super.onUpdate();
        this.time++;
        if (this.time>=this.bullet.getMaxTime()){
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
import { EntityLiving } from "../EntityLiving";
import { PhysicsHelper } from "../PhysicsHelper";
import { Field } from "../../field/Field";
import { BulletState } from "./BulletState";
import { Bullet } from './Bullet';
import { EntityManager } from '../../field/EntityManager';


export class EntityBullet extends EntityLiving{
    public physics: PhysicsHelper;
    public state: Symbol;
    public time: number;//スポーンしてから立ったtick数
    public maxTime: number;//存在できるtick数
    public fadeHPRate: number;//fade状態になった時のHPの減少する割合
    public fadeSpeedRate: number;//fade状態になった時の速度の減少の割合
    public bullet: Bullet
    constructor(entityManager:EntityManager,bullet:Bullet){
        super(entityManager,bullet.getMaxHP());
        this.bullet = bullet;
        this.physics = new PhysicsHelper();
        this.time =0;
        this.fadeHPRate = 0.2;
        this.fadeSpeedRate =0.2;
        this.physics.k=0;
    }

    public onUpdate(){
        super.onUpdate();
        this.time++;
        if (this.time>=this.bullet.getMaxTime()){
            this.state = BulletState.FADE;
        }
        if (this.state == BulletState.FADE){
            this.hp-=this.maxHp*this.fadeHPRate
            this.physics.speed.setLength(this.physics.speed.getLength()-this.bullet.getSpeed()*this.fadeSpeedRate);
        }
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
    }

    public onSpawned(){
        this.state = BulletState.NORMAL
    }

}
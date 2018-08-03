import { IBullet } from './IBullet';
import { Field } from '../../field/Field';
import { Coord } from '../../../common/Coord';
import { Bmodi } from './modification/BModi';
import { Bullet } from './Bullet';
import { PhysicsHelper } from '../PhysicsHelper';
import { EntityManager } from '../../field/EntityManager';
export class Barrage implements IBullet{
    private base: IBullet;
    private amount: number;
    private modification: Bmodi;

    private bulletList :Array<IBullet>;
    private totalCost :number;
    constructor(base:IBullet,amount:number, modification:Bmodi){
        this.base = base;
        this.amount = amount;
        this.modification = modification;

        this.totalCost=0;
        this.bulletList = new Array<IBullet>(this.amount)
        for (let i = 0; i < this.amount; i++) {
            let time = base.getMaxTime()+i*modification.getMaxTimeDifference()
            let hp = base.getMaxHP()+i*modification.getMaxHPDifference()
            let speed = base.getSpeed()+i*modification.getSpeedDifference();
            this.bulletList[i] = base.modifiedCopy(time,hp,speed)
            this.totalCost += this.bulletList[i].getCost();
        }
    }

    public getSpeed():number{
        return this.base.getSpeed();
    }

    public getMaxHP():number{
        return this.base.getMaxHP();
    }

    public getMaxTime():number{
        return this.base.getMaxTime();
    }

    public getCost():number{
        return this.totalCost;
    }

    public spawn(entitymanager:EntityManager,coord:Coord,angle:number,spawnTime:number){
        let maxAngle = this.modification.getAngleDifference()*this.bulletList.length;
        for (let i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].spawn(entitymanager,coord,angle+i*this.modification.getAngleDifference()-maxAngle/2,spawnTime+i*this.modification.getSpawnTimeDifference());
        }
    }

    public copy():IBullet{
        return new Barrage(this.base.copy(),this.amount,this.modification);
    }

    public modifiedCopy(time:number,hp:number,speed:number):IBullet{
        return new Barrage(this.base.modifiedCopy(time,hp,speed),this.amount,this.modification);
    }

}
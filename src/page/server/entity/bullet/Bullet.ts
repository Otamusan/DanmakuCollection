import { Coord } from "../../../common/Coord";
import { ShapeCircle } from '../../../client/shape/ShapeCircle';
import { IBullet } from './IBullet';
import { Field } from "../../field/Field";
import { Entity } from '../Entity';
import { EntityBullet } from './EntityBullet';
import { EntityManager } from '../../field/EntityManager';

export class Bullet implements IBullet{
    private maxTime: number;
    private maxHp: number;
    private speed: number;
    private baseCost = 10;
    constructor(time:number,hp:number,speed:number){
        this.maxTime = time;
        this.maxHp = hp;
        this.speed = speed;
    }

    public getSpeed():number{
        return this.speed;
    }

    public getMaxHP():number{
        return this.maxHp;
    }

    public getMaxTime():number{
        return this.maxTime;
    }

    public getCost():number{
        return this.speed*this.maxHp*this.maxTime+this.baseCost;
    }

    public spawn(entitymanager:EntityManager,coord:Coord,angle:number,spawntime:number){
        let bullet = new EntityBullet(entitymanager,this)
        bullet.physics.setSpeed(Coord.createFromAngle(angle,this.speed))
        if (spawntime!=0){
            entitymanager.spawnEntityWithLag(bullet,spawntime,coord);
        }else{
            bullet.setCoord(coord);
            entitymanager.spawnEntity(bullet)
        }
    }

    public copy():IBullet{
        return new Bullet(this.maxTime,this.maxHp,this.speed);
    }

    public modifiedCopy(time:number,hp:number,speed:number):IBullet{
        return new Bullet(time,hp,speed);
    }
}
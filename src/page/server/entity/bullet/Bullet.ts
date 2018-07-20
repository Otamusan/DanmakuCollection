import { Coord } from "../../../common/Coord";
import { ShapeCircle } from '../../../client/shape/ShapeCircle';

export class Bullet{
    private maxTime: number;
    private maxHp: number;
    private speed: number;
    private baseCost: 10
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
}
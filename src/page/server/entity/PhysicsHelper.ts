import { Coord } from "../../common/Coord";
import { Entity } from './Entity';

export class PhysicsHelper{
    public speed: Coord; //速さ
    public acceleration: Coord; //加速度
    public force: Coord;
    public speedLimit: number;
    public weight: number; //重さ
    public k:number; //動く時の抵抗
    constructor(){
        this.speed = new Coord(0,0);
        this.acceleration = new Coord(0,0);
        this.force = new Coord(0,0)
        this.speedLimit = 0;
        this.weight = 1;
        this.k=0;
    }

    public addForce(f: Coord){
        this.force.addCoord(f.copy())
    }

    public onUpdate(){
        this.speed.addCoord(this.acceleration.copy());
        if (this.speed.getLength()!=0){
            this.speed.subtractCoord(this.speed.copy().multiply(this.k));
        }

        this.acceleration = this.force.copy().divide(this.weight);
        this.force.x=0;
        this.force.y=0;
        if (this.speedLimit!=0 && this.speed.getLength()>this.speedLimit){
            this.speed.setLength(this.speedLimit);
        }
    }

    //実際に動かす時はこっちを使う
    public setTransitionToCoord(coord:Coord){
        coord.addCoord(this.speed);
    }

    public getSpeed(): Coord {
        return this.speed.copy();
    }

    public setSpeed(speed: Coord){
        this.speed = speed.copy();
    }

    public getAcceleration(){
        return this.acceleration.copy();
    }

    public setAcceleration(acceleration: Coord){
        this.acceleration = acceleration.copy();
    }
}
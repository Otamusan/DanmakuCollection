import { Color } from '../../common/Color';
import { Coord } from '../../common/Coord';
import { PFunc } from './PFunc';
import { Shape } from '../shape/Shape';
//パーティクルの実装部分(Bridgeパターン)
export class Particle {
    private color: Color; //パーティクルの色
    private vector: Coord; //パーティクルの座標
    private coord: Coord; //パーティクルの速度ベクトル
    private size: number; //パーティクルの大きさ
    private time: number; //パーティクルが生成されてから経った時間（tick）
    private remain: number; //パーティクルが残留する時間(tick)
    private radian: number; //パーティクルの向きのラジアン値
    private alpha: number; //パーティクルの透明度（1~0）
    private isDead: boolean;
    private pFunc: PFunc; //パーティクルが持つ機能
    private shape: Shape; //パーティクルの形
    constructor(color: Color, vector: Coord, coord: Coord, size: number, remain: number, pFunc: PFunc, shape: Shape, radian: number, alpha: number) {
        this.color = color;
        this.vector = vector;
        this.coord = coord;
        this.size = size;
        this.remain = remain;
        this.shape = shape;
        this.pFunc = pFunc;
        this.time = 0
        this.radian = radian;
        this.alpha = alpha;
    }
    public onUpdate() {

        this.pFunc.onSystemUpdate(this);
        this.time++;
        this.coord.addCoord(this.vector);
        if (this.time >= this.remain) {
            this.setDead();
        }
    }
    public setDead() {
        this.isDead = true;
    }

    public isParticleDead(): boolean {
        return this.isDead;
    }

    public getAlpha(): number {
        return this.alpha;
    }

    public setAlpha(alpha: number) {
        this.alpha = alpha;
    }

    public getRad(): number {
        return this.radian;
    }

    public setRad(rad: number) {
        this.radian = rad;
    }

    public getColor(): Color {
        return this.color;
    }
    public setColor(color: Color) {
        this.color = color;
    }
    public getVector(): Coord{
        return this.vector;
    }
    public setVector(vector: Coord) {
        this.vector = vector;
    }
    public getCoord(): Coord {
        return this.coord;
    }
    public setCoord(coord: Coord) {
        this.coord = coord;
    }
    public getSize(): number {
        return this.size;
    }
    public setSize(size: number) {
        this.size = size;
    }
    public getRemain(): number {
        return this.remain;
    }
    public getTime(): number {
        return this.time;
    }
    public getShape(): Shape {
        return this.shape;
    }
}
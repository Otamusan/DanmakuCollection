import { Field } from '../../field/Field';
import { Coord } from '../../../common/Coord';
import { copyFile } from 'fs';
import { ShapeCircle } from '../../../client/shape/ShapeCircle';
import { EntityManager } from '../../field/EntityManager';
export interface IBullet{
    getSpeed():number; //初期スピード

    getMaxHP():number; //体力（威力）

    getMaxTime():number; //存在できるtick数

    getCost():number;

    spawn(entityManager:EntityManager,coord:Coord,angle:number,spawnTime:number) //弾(弾幕)の発射

    copy():IBullet;

    modifiedCopy(time:number,hp:number,speed:number):IBullet;//それぞれを修正しつつコピー
}
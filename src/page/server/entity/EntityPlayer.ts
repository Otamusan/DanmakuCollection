import { EntityLiving } from "./EntityLiving";
import { Player } from "../Player";
import { Coord } from "../../common/Coord";
import { MouseState } from "../../client/MouseState";
import { EntityBullet } from "./bullet/EntityBullet";
import { Field } from "../field/Field";
import { PhysicsHelper } from './PhysicsHelper';
import { ShapeCircle } from '../../client/shape/ShapeCircle';
import { Bullet } from './bullet/Bullet';
import { Barrage } from './bullet/Barrage';
import { EntityManager } from '../field/EntityManager';
import { Bmodi } from './bullet/modification/Bmodi';

export class EntityPlayer extends EntityLiving {
    public player: Player;
    public maxDistance: number; //自機とカーソルの距離の最大
    public physics : PhysicsHelper;
    constructor(entityManager:EntityManager,player: Player, maxHp: number) {
        super(entityManager,maxHp);
        this.physics = new PhysicsHelper();
        this.player = player;
        this.physics.weight = this.maxHp/10;
        this.physics.speedLimit = 0
        this.maxDistance = 100
        this.physics.k = 0.1
    }

    public getPointerCoord(): Coord {
        return this.player.controller.getMouseState().getCoord();
    }

    public isPlayerClicked(n: number): boolean {
        return this.player.controller.getMouseState().isMousePressed(n);
    }

    public getMouseToPlayer(){
        let mouse = this.getPointerCoord();
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxDistance) {
            return mouse.copy().subtractCoord(this.coord.copy())
        } else {
            return mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxDistance)
        }
    }

    public onUpdate() {
        super.onUpdate()
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
        if (this.player.controller.getKeyState().isKeyDown(38)){
            //let bullet = new Barrage(new Barrage(new Bullet(50,50,10),5,new Bmodi(0,100,-1,0,0)),2,new Bmodi(0,0,0,0,20))
            //let bullet = new Barrage(new Barrage(new Barrage(new Bullet(50,500,5),2,new Bmodi(0,-300,0,0,5)),36,new Bmodi(0,0,0,10,0)),1,new Bmodi(0,0,0,36,1))
            //let bullet = new Bullet(50,500,1)
            //let bullet = new Barrage(new Barrage(new Barrage(new Bullet(10,50,5),50,new Bmodi(0,50,0.5,0,0)),6,new Bmodi(0,0,0,60,0)),3,new Bmodi(0,0,0,20,20))
            let bullet = new Barrage(new Bullet(10,50,5),50,new Bmodi(0,0,1,0,0))
            bullet.spawn(this.entityManager,this.coord,this.getMouseToPlayer().getAngle(),0);
        }
        this.physics.addForce(this.getMouseToPlayer())
    }
}
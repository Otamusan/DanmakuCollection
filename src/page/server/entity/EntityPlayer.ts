import { EntityLiving } from "./EntityLiving";
import { Player } from "../Player";
import { Coord } from "../../common/Coord";
import { MouseState } from "../../client/MouseState";
import { EntityBullet } from "./bullet/EntityBullet";
import { Field } from "../field/Field";
import { PhysicsHelper } from './PhysicsHelper';
import { ShapeCircle } from '../../client/shape/ShapeCircle';
import { Bullet } from "./bullet/Bullet";

export class EntityPlayer extends EntityLiving {
    public player: Player;
    public maxForce: number; //操作したときのかかる力の最大
    public physics : PhysicsHelper;
    constructor(field:Field,player: Player, maxHp: number) {
        super(field,maxHp);
        this.physics = new PhysicsHelper();
        this.player = player;
        this.physics.weight = this.maxHp/10;
        this.physics.speedLimit = 0
        this.maxForce = 100
        this.physics.k = 0.1
    }

    public getPointerCoord(): Coord {
        return this.player.controller.getMouseState().getCoord();
    }

    public isPlayerClicked(n: number): boolean {
        return this.player.controller.getMouseState().isMousePressed(n);
    }

    public onUpdate() {
        super.onUpdate()
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
        let mouse = this.getPointerCoord();
        if (this.isPlayerClicked(0)){
            let bullet = new EntityBullet(this.field,new Bullet(10,100,5))

            bullet.physics.speed.addCoord(mouse.copy().subtractCoord(this.coord.copy()).setLength(bullet.bullet.getSpeed()));
            bullet.coord = this.coord.copy();
            bullet.physics.speed.addCoord(this.physics.speed.copy());
            this.field.spawnEntity(bullet)
        }
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxForce) {
            this.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()))
        } else {
            this.physics.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxForce))
        }
    }
}
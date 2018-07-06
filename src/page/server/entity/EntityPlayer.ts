import { EntityLiving } from "./EntityLiving";
import { Player } from "../Player";
import { Coord } from "../../common/Coord";
import { MouseState } from "../../client/MouseState";
import { EntityBullet } from "./EntityBullet";
import { Field } from "../field/Field";

export class EntityPlayer extends EntityLiving {
    public player: Player;
    public maxForce: number; //操作したときのかかる力の最大
    constructor(field:Field,player: Player, maxHp: number) {
        super(field,maxHp);
        this.player = player;
        this.weight = this.maxHp/10;
        this.speedLimit = 0
        this.maxForce = 100
        this.k = 0.1
    }

    public getPointerCoord(): Coord {
        return this.player.controller.getMouseState().getCoord();
    }

    public isPlayerClicked(n: number): boolean {
        return this.player.controller.getMouseState().isMousePressed(n);
    }

    public onUpdate() {
        super.onUpdate()
        let mouse = this.getPointerCoord();
        if (this.isPlayerClicked(0)){
            let bullet = new EntityBullet(this.field,200)
            bullet.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(5))
            bullet.coord = this.coord.copy();
            this.field.spawnEntity(bullet)
        }
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxForce) {
            this.addForce(mouse.copy().subtractCoord(this.coord.copy()))
        } else {
            this.addForce(mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxForce))
        }
    }
}
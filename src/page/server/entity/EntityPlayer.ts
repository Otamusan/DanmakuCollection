import { EntityLiving } from "./EntityLiving";
import { Player } from "../Player";
import { Coord } from "../../common/Coord";

export class EntityPlayer extends EntityLiving {
    public player: Player;
    constructor(player: Player, maxHp: number) {
        super(maxHp);
        this.player = player;
    }

    public getPointerCoord(): Coord {
        return this.player.controller.getMouseState().getCoord();
    }

    public isPlayerClicked(n: number): boolean {
        return this.player.controller.getMouseState().isMousePressed(n);
    }

    public onUpdate() {
        let mouse = this.getPointerCoord();
        this.coord.addCoord(mouse.multiplyCoord(0.1))
    }
}
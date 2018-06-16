import { Player } from "./Player";

export class PlayerManager {
    public playerList: Array<Player>;
    constructor() {
        this.playerList = new Array<Player>()
    }

    public Login(player: Player) {
        this.playerList.push(player);
    }
}
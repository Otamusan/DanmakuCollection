import { Player } from "./Player";

export class PlayerManager {
    private playerList: Array<Player>;
    private max: number;
    constructor(max:number) {
        this.max=max;
        this.playerList = new Array<Player>(max)
        //this.playerList.fill(null);
    }
    public login(player: Player){
        this.playerList.push(player);
    }

    public getPlayer(i):Player{
        return this.playerList[i]
    }

    public logout(i){
        this.playerList[i]=null;
    }
}
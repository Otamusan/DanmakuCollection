import { Field } from './field/Field';
import { Player } from "./Player";
import { ClientData } from "../common/ClientData";
import { PlayerManager } from './PlayerManager';

export class Server {
    public fieldList: Array<Field>
    public playerManager: PlayerManager
    constructor() {
        this.fieldList = new Array<Field>()
        this.playerManager = new PlayerManager(100);
    }

    public onUpdate = () => {
        this.fieldList.forEach(field => {
            field.onSystemUpdate();
        });
    }
    public getPlayer(i):Player{
        return this.playerManager.getPlayer(i);
    }

    public getAvailableField(player: Player): Field {
        let field;
        this.fieldList.forEach(f => {
            if (f.canLogin(player)) {
                field = f;
            }
        });
        return field;
    }

    public setField(field:Field){
        this.fieldList.push(field)
    }

    public login(data: ClientData):Player{
        let player = new Player(data);
        let field = this.getAvailableField(player);
        this.playerManager.login(player);
        field.addPlayer(player);
        return player;
    }
}

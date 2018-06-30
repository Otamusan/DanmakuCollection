import { Field } from "./field/Field";
import { Player } from "./Player";
import { ClientData } from "../common/ClientData";

export class Server {
    public fieldList: Array<Field>
    public playerList: Array<Player>
    constructor() {
        this.fieldList = new Array<Field>()
    }

    public onUpdate = () => {
        this.fieldList.forEach(field => {
            field.onSystemUpdate();
        });
    }

    public getNewID(){
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

    public login(data: ClientData) {
        let player = new Player(0, data);
        let field = this.getAvailableField(player);
        field.Login(player);
        player.field = field;
    }
}

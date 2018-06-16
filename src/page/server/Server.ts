import { Field } from "./field/Field";
import { Player } from "./Player";


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

    public getAvailableField(player: Player): Field {
        let field;
        this.fieldList.forEach(f => {
            if (f.canLogin(player)) {
                field = f;
            }
        });
        return field;
    }

    public login(player: Player) {
        let field = this.getAvailableField(player);
        field.Login(player);
        player.field = field;
    }
}

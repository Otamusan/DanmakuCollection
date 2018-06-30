import { Controller } from "../client/Controller";
import { Field } from './field/Field';
import { ClientData } from "../common/ClientData";

export class Player {
    public controller: Controller;
    private id: number;
    public field: Field;
    public data : ClientData;
    constructor(id: number, data: ClientData) {
        this.id = id;
        this.data = data;
    }
}
import { Controller } from "../client/Controller";
import { ClientData } from "../common/ClientData";
import { Field } from './field/Field';

export class Player {
    public controller: Controller;
    public field: Field;
    public data : ClientData;
    constructor(data: ClientData) {
        this.data = data;
    }
}
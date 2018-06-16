import { Controller } from "../client/Controller";
import { Field } from './field/Field';

export class Player {
    public controller: Controller;
    private name: string
    public field: Field;
    constructor(name: string) {
        this.name = name;
    }
}
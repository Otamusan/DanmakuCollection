import { Client } from '../client/Client';
import { Common } from '../common/Common';
export namespace Server {
    export class Player {
        public controller: Client.Controller;
        private name: string
        public field: Server.Field.Field;
        constructor(name: string) {
            this.name = name;
        }
    }
    export class Server {
        public fieldList: Array<Field.Field>
        public playerList: Array<Player>
        constructor() {
            this.fieldList = new Array<Field.Field>()
        }

        public onUpdate = () => {
            this.fieldList.forEach(field => {
                field.onSystemUpdate();
            });
        }

        public getAvailableField(player: Player): Field.Field {
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

    export namespace Field {
        export class Field extends Common.StateTree {
            public playerManager: PlayerManager
            constructor(parent?: Field) {
                super(parent);
                this.playerManager = new PlayerManager();
            }

            public transitionSubState(subState: Common.StateTree) {
                if (!(subState instanceof Field)) return;
                this.currentSubState = subState;
                this.currentSubState.onTransitionedParentState(this);
            }

            public canLogin(play: Player): boolean {
                return true;
            }

            public Login(player: Player) {
                this.playerManager.Login(player);
            }
        }

        export class FieldGame extends Field {
            public EntityList: Array<Entity.Entity>;
            constructor(parent?: Field) {
                super(parent);
                this.EntityList = new Array<Entity.Entity>();

            }

            public onUpdate() {
                this.EntityList.forEach((entity, i) => {
                    entity.onUpdate();
                    if (entity.isDead) {
                        this.EntityList[i] = null;
                    }
                });
            }
        }
    }

    export namespace Entity {
        export class Entity {
            public coord: Common.Coord;
            public isDead: boolean
            constructor() {
            }

            public onUpdate() {
            }

            public getCoord(): Common.Coord {
                return this.coord;
            }

            public setCoord(coord: Common.Coord) {
                this.coord = coord;
            }

            public setDead() {
                this.isDead = true;
            }
        }

        export class EntityLiving extends Entity {
            public vector: Common.Coord;
            public hp: number;
            private maxHp: number;
            constructor(maxHp: number) {
                super();
                this.maxHp = maxHp;
                this.hp = maxHp;
            }

            public onUpdate() {
                this.coord.addCoord(this.vector.copy())
            }

            public addDamaged(n: number) {
                this.hp -= n;
                if (this.hp <= 0) {
                    this.hp = 0;
                }
            }

            public getHP(): number {
                return this.hp
            }

            public getMaxHP(): number {
                return this.maxHp;
            }

            public getVector(): Common.Coord {
                return this.coord;
            }
        }

        export class EntityPlayer extends EntityLiving {
            public player: Player;
            constructor(player: Player, maxHp: number) {
                super(maxHp);
                this.player = player;
            }

            public getPointerCoord(): Common.Coord {
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
    }

    export class PlayerManager {
        public playerList: Array<Player>;
        constructor() {
            this.playerList = new Array<Player>()
        }

        public Login(player: Player) {
            this.playerList.push(player);
        }
    }
}

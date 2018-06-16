"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../common/Common");
var Server;
(function (Server_1) {
    class Player {
        constructor(name) {
            this.name = name;
        }
    }
    Server_1.Player = Player;
    class Server {
        constructor() {
            this.onUpdate = () => {
                this.fieldList.forEach(field => {
                    field.onSystemUpdate();
                });
            };
            this.fieldList = new Array();
        }
        getAvailableField(player) {
            let field;
            this.fieldList.forEach(f => {
                if (f.canLogin(player)) {
                    field = f;
                }
            });
            return field;
        }
        login(player) {
            let field = this.getAvailableField(player);
            field.Login(player);
            player.field = field;
        }
    }
    Server_1.Server = Server;
    let Field;
    (function (Field_1) {
        class Field extends Common_1.Common.StateTree {
            constructor(parent) {
                super(parent);
                this.playerManager = new PlayerManager();
            }
            transitionSubState(subState) {
                if (!(subState instanceof Field))
                    return;
                this.currentSubState = subState;
                this.currentSubState.onTransitionedParentState(this);
            }
            canLogin(play) {
                return true;
            }
            Login(player) {
                this.playerManager.Login(player);
            }
        }
        Field_1.Field = Field;
        class FieldGame extends Field {
            constructor(parent) {
                super(parent);
                this.EntityList = new Array();
            }
            onUpdate() {
                this.EntityList.forEach((entity, i) => {
                    entity.onUpdate();
                    if (entity.isDead) {
                        this.EntityList[i] = null;
                    }
                });
            }
        }
        Field_1.FieldGame = FieldGame;
    })(Field = Server_1.Field || (Server_1.Field = {}));
    let Entity;
    (function (Entity_1) {
        class Entity {
            constructor() {
            }
            onUpdate() {
            }
            getCoord() {
                return this.coord;
            }
            setCoord(coord) {
                this.coord = coord;
            }
            setDead() {
                this.isDead = true;
            }
        }
        Entity_1.Entity = Entity;
        class EntityLiving extends Entity {
            constructor(maxHp) {
                super();
                this.maxHp = maxHp;
                this.hp = maxHp;
            }
            onUpdate() {
                this.coord.addCoord(this.vector.copy());
            }
            addDamaged(n) {
                this.hp -= n;
                if (this.hp <= 0) {
                    this.hp = 0;
                }
            }
            getHP() {
                return this.hp;
            }
            getMaxHP() {
                return this.maxHp;
            }
            getVector() {
                return this.coord;
            }
        }
        Entity_1.EntityLiving = EntityLiving;
        class EntityPlayer extends EntityLiving {
            constructor(player, maxHp) {
                super(maxHp);
                this.player = player;
            }
            getPointerCoord() {
                return this.player.controller.getMouseState().getCoord();
            }
            isPlayerClicked(n) {
                return this.player.controller.getMouseState().isMousePressed(n);
            }
            onUpdate() {
                let mouse = this.getPointerCoord();
                this.coord.addCoord(mouse.multiplyCoord(0.1));
            }
        }
        Entity_1.EntityPlayer = EntityPlayer;
    })(Entity = Server_1.Entity || (Server_1.Entity = {}));
    class PlayerManager {
        constructor() {
            this.playerList = new Array();
        }
        Login(player) {
            this.playerList.push(player);
        }
    }
    Server_1.PlayerManager = PlayerManager;
})(Server = exports.Server || (exports.Server = {}));
//# sourceMappingURL=Server.js.map
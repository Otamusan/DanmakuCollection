"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityLiving_1 = require("./EntityLiving");
const PhysicsHelper_1 = require("./PhysicsHelper");
const Bullet_1 = require("./bullet/Bullet");
const Barrage_1 = require("./bullet/Barrage");
const Bmodi_1 = require("./bullet/modification/Bmodi");
class EntityPlayer extends EntityLiving_1.EntityLiving {
    constructor(entityManager, player, maxHp) {
        super(entityManager, maxHp);
        this.physics = new PhysicsHelper_1.PhysicsHelper();
        this.player = player;
        this.physics.weight = this.maxHp / 10;
        this.physics.speedLimit = 0;
        this.maxDistance = 100;
        this.physics.k = 0.1;
    }
    getPointerCoord() {
        return this.player.controller.getMouseState().getCoord();
    }
    isPlayerClicked(n) {
        return this.player.controller.getMouseState().isMousePressed(n);
    }
    getMouseToPlayer() {
        let mouse = this.getPointerCoord();
        if (mouse.copy().subtractCoord(this.coord.copy()).getLength() < this.maxDistance) {
            return mouse.copy().subtractCoord(this.coord.copy());
        }
        else {
            return mouse.copy().subtractCoord(this.coord.copy()).setLength(this.maxDistance);
        }
    }
    onUpdate() {
        super.onUpdate();
        this.physics.onUpdate();
        this.physics.setTransitionToCoord(this.coord);
        if (this.player.controller.getKeyState().isKeyDown(38)) {
            //let bullet = new Barrage(new Barrage(new Bullet(50,50,10),5,new Bmodi(0,100,-1,0,0)),2,new Bmodi(0,0,0,0,20))
            //let bullet = new Barrage(new Barrage(new Barrage(new Bullet(50,500,5),2,new Bmodi(0,-300,0,0,5)),36,new Bmodi(0,0,0,10,0)),1,new Bmodi(0,0,0,36,1))
            //let bullet = new Bullet(50,500,1)
            //let bullet = new Barrage(new Barrage(new Barrage(new Bullet(10,50,5),50,new Bmodi(0,50,0.5,0,0)),6,new Bmodi(0,0,0,60,0)),3,new Bmodi(0,0,0,20,20))
            let bullet = new Barrage_1.Barrage(new Bullet_1.Bullet(10, 50, 5), 50, new Bmodi_1.Bmodi(0, 0, 1, 0, 0));
            bullet.spawn(this.entityManager, this.coord, this.getMouseToPlayer().getAngle(), 0);
        }
        this.physics.addForce(this.getMouseToPlayer());
    }
}
exports.EntityPlayer = EntityPlayer;
//# sourceMappingURL=EntityPlayer.js.map
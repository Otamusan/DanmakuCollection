"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityManager {
    constructor() {
        this.entityList = new Array();
        this.entityLagList = new Array();
    }
    spawnEntity(entity) {
        this.entityList.push(entity);
        entity.onSpawned();
    }
    getEntityList() {
        return this.entityList;
    }
    onUpdate() {
        this.entityLagList.forEach((entityLag, i) => {
            entityLag.addTime();
            if (entityLag.isReached()) {
                let entity = entityLag.getEntity();
                //entity.setCoord(entityLag.getCoord());
                this.spawnEntity(entity);
                this.entityLagList.splice(i, 1);
            }
        });
        this.entityList.forEach((entity, i) => {
            entity.onUpdate();
            entity.prevCoord = entity.coord.copy();
            if (entity.isDead) {
                this.entityList.splice(i, 1);
            }
        });
    }
    spawnEntityWithLag(entity, maxTime, coordReference) {
        this.entityLagList.push(new EntityWithTime(entity, maxTime, coordReference));
    }
}
exports.EntityManager = EntityManager;
class EntityWithTime {
    constructor(entity, max, coordReference) {
        this.entity = entity;
        this.time = 0;
        this.max = max;
        this.coordReference = coordReference;
    }
    isReached() {
        return this.max <= this.time;
    }
    addTime() {
        this.time++;
    }
    getEntity() {
        return this.entity;
    }
    getCoord() {
        return this.coordReference.copy();
    }
}
//# sourceMappingURL=EntityManager.js.map
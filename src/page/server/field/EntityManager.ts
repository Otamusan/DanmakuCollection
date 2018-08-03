import { Entity } from '../entity/Entity';
import { Coord } from '../../common/Coord';
export class EntityManager{
    private entityList:Array<Entity>
    private entityLagList:Array<EntityWithTime>
    constructor(){
        this.entityList = new Array<Entity>();
        this.entityLagList = new Array<EntityWithTime>();
    }

    public spawnEntity(entity:Entity){
        this.entityList.push(entity)
    }

    public getEntityList():Array<Entity>{
        return this.entityList;
    }

    public onUpdate(){
        this.entityLagList.forEach((entityLag,i)=>{
            entityLag.addTime();
            if (entityLag.isReached()){
                let entity = entityLag.getEntity()
                entity.setCoord(entityLag.getCoord());
                this.spawnEntity(entity)
                this.entityLagList.splice(i,1);
            }
        });
        this.entityList.forEach((entity, i) => {
            entity.onUpdate();
            if (entity.isDead) {
                this.entityList.splice(i,1)
            }
        });
    }

    public spawnEntityWithLag(entity:Entity,maxTime:number,coordReference:Coord){
        this.entityLagList.push(new EntityWithTime(entity,maxTime,coordReference))
    }
}

class EntityWithTime{
    public entity:Entity;
    public time:number;
    public max:number;
    public coordReference:Coord;
    constructor(entity:Entity,max:number,coordReference:Coord){
        this.entity = entity;
        this.time = 0;
        this.max = max;
        this.coordReference = coordReference;
    }

    public isReached():boolean{
        return this.max<=this.time
    }

    public addTime(){
        this.time++
    }

    public getEntity():Entity{
        return this.entity;
    }

    public getCoord():Coord{
        return this.coordReference.copy();
    }
}
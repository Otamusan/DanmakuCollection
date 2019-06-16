export class Bmodi{
    private maxTimeDifference:number;
    private speedDifference:number;
    private maxHPDifference:number;
    private angleDifference:number;
    private spawnTimeDifference:number;
    constructor(time:number,hp:number,speed:number,angle:number,spanwTime:number){
        this.maxTimeDifference = time;
        this.maxHPDifference = hp;
        this.speedDifference = speed;
        this.angleDifference = angle;
        this.spawnTimeDifference = spanwTime;
    }
    public getMaxTimeDifference(){
        return this.maxTimeDifference;
    }
    public getSpeedDifference(){
        return this.speedDifference;
    }
    public getMaxHPDifference(){
        return this.maxHPDifference;
    }
    public getAngleDifference(){
        return this.angleDifference;
    }
    public getSpawnTimeDifference(){
        return this.spawnTimeDifference;
    }
}
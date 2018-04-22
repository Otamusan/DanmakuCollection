
class CdcView extends CView{
    constructor
}

class CDanmakuCollection {
    constructor() {
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;
        this.canvas = CDOMUtil.elt('canvas', {
            height: this.height,
            width: this.width
        });
    }
    displayCanvas() {
        document.body.style.margin = 0;
        document.body.style.overflow = "hidden"
        document.body.appendChild(this.canvas);
        this.getctx().fillStyle = '#00FF00';
        this.getctx().fillRect(0, 0, this.width, this.height);
    }
    getctx() {
        return this.canvas.getContext('2d');
    }
    getGL() {
        return this.canvas.getContext("webgl");
    }
    WebGLinit(){
        this.getGL().clearColor(0.0, 0.0, 0.0, 1.0);
        this.getGL().enable(this.getGL().DEPTH_TEST);
        this.getGL().depthFunc(this.getGL().LEQUAL);
        this.getGL().clear(this.getGL().COLOR_BUFFER_BIT | this.getGL().DEPTH_BUFFER_BIT);
    }
    onUpdate(){

    }
}

const DanmakuCollection = new CDanmakuCollection();
console.log(DanmakuCollection.canvas);
DanmakuCollection.displayCanvas();
//DanmakuCollection.WebGLinit();
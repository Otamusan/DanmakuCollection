import { Scene } from "./Scene";
import { Client } from '../Client';
import { DOMHandler } from "../dom/DOMHandler";
import { SceneGame } from './SceneGame';
import { DivManager } from '../DivManager';

export class SceneConnect extends Scene {
    private textbox: HTMLInputElement;
    private decision: HTMLInputElement;
    private local: HTMLInputElement;
    private state: HTMLParagraphElement;
    public game: SceneGame;
    public ws: WebSocket

    constructor(client: Client, div: HTMLDivElement, parentScene?: Scene) {
        super(client, div, parentScene)
        this.textbox = DOMHandler.getElementByID<HTMLInputElement>(this.sceneDiv, "address")
        this.local = DOMHandler.getElementByID<HTMLInputElement>(this.sceneDiv, "local")
        this.decision = DOMHandler.getElementByID<HTMLInputElement>(this.sceneDiv, "decision")
        this.state = DOMHandler.getElementByID<HTMLParagraphElement>(this.sceneDiv, "state")
        this.decision.onclick = this.isButtonPushed;
        this.local.onclick=()=>{
            this.game = new SceneGame(this.client, this.client.divManager.getDivCopy("game"));
            this.transitionSubState(this.game);
        }
    }

    public getAddress(): string {
        return this.textbox.value;
    }

    public isButtonPushed = () => {
        let address: string = this.getAddress();
        this.ws = new WebSocket(address, ['soap', 'xmpp'])
        this.ws.onopen = () => {
            this.game = new SceneGame(this.client, this.client.divManager.getDivCopy("game"),this.ws);
            this.transitionSubState(this.game);
        }
    }

    public onUpdate(){
        super.onUpdate();
        if (this.ws != null){
            switch (this.ws.readyState){
                case (WebSocket.CONNECTING):{
                    this.state.innerHTML = "接続中"
                    break;
                }
                case (WebSocket.OPEN):{
                    this.state.innerHTML="接続完了。準備中"
                    break;
                }
                case (WebSocket.CLOSED):{
                    this.state.innerHTML= "接続が閉じています"
                    break;
                }
            }
        }else{
            this.state.innerHTML = "接続してください"
        }
    }
}
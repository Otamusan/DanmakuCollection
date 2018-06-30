import { Controller } from './Controller';
import { Scene } from './scene/Scene';
import { DivManager } from './DivManager';
import { Server } from '../server/Server';
import { server } from 'websocket';

export class Client {
    public document: Document;
    public controller: Controller;
    private rootScene: Scene;
    public divManager: DivManager;
    public height: number;
    public width: number;
    public internalServer: Server;
    constructor(document: Document, height: number, width: number, server: Server) {
        this.document = document;
        this.controller = new Controller(this.document);
        this.divManager = new DivManager(document);
        this.divManager.initDocument();
        this.rootScene = new Scene(this, null);
        this.document.body.style.margin = "0";
        this.document.body.style.overflow = "hidden";
        this.height = height;
        this.width = width;
        this.internalServer = server;
    }

    public registerMainScene(scene: Scene) {
        this.rootScene = scene;
    }

    public getMainScene() {
        return this.rootScene;
    }

    public onUpdate = () => {
        this.controller.onUpdate();
        this.rootScene.onSystemUpdate();
    }
}
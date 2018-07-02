import { Client } from "./client/Client";
import { SceneTitle } from "./client/scene/SceneTitle";
import { Server } from './server/Server';
import { FieldGame } from './server/field/FieldGame';

namespace main {
    const server = new Server();
    const client = new Client(document, 600, 800, server);
    const mainScene = new SceneTitle(client, client.divManager.getDivCopy("title"));
    server.setField(new FieldGame())
    mainScene.appendSceneDiv();
    client.registerMainScene(mainScene);
    setInterval(client.onUpdate, 1000/60);
    setInterval(server.onUpdate, 1000/60);
}

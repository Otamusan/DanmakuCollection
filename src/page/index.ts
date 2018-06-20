import { Client } from "./client/Client";
import { SceneTitle } from "./client/scene/SceneTitle";

namespace main {
    const client = new Client(document, 600, 800);
    const mainScene = new SceneTitle(client, client.divManager.getDivCopy("title"));
    mainScene.appendSceneDiv();
    client.registerMainScene(mainScene);
    setInterval(client.onUpdate, 1000/60);
}

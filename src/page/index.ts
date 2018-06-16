import { Client } from './client/Client';
namespace main {
    const client = new Client.Client(document, 600, 800);
    const mainScene = new Client.Scene.SceneTitle(client, client.divManager.getDivCopy("title"));
    client.registerMainScene(mainScene);
    mainScene.appendSceneDiv();
    setInterval(client.onUpdate, 1000 / 60);
}

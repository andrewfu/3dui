import { Vector3, FreeCamera, ActionManager } from "@babylonjs/core";

export default (scene) => {
  const startCameraPos = new Vector3(30, 15, -100);
  var camera = new FreeCamera("camera1", startCameraPos, scene);
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  camera.angularSensibility = 5000;
  scene.createDefaultLight();
  scene.actionManager = new ActionManager(scene);
  return { camera, startCameraPos };
};

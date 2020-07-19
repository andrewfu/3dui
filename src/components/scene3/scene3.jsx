import React from "react";
import SceneComponent from "babylonjs-hook";

import Prepare from "./prepare";
import CreateSkybox from "./skybox";
import CreateFullSceenUI from "./full-sceen-ui";
import CreateBaseMeshes from "./base-mesh";
import CreateVolume from "./volume";
import SetupPointerLock from "./pointer-lock";

let baseMeshes = null;
let meta = null;

const Ready = (scene) => {
  const { camera, startCameraPos } = Prepare(scene);
  CreateSkybox(scene);
  CreateFullSceenUI(scene, meta);
  baseMeshes = CreateBaseMeshes();

  CreateVolume({ baseMeshes, objects: meta, xDim: 3, yDim: 3 });

  //SetupPointerLock(scene);

  /*scene.onPointerDown = () => {
    if (!isLocked) {
      canvas.requestPointerLock =
        canvas.requestPointerLock ||
        canvas.msRequestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;
      if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    }
    var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera);
    var hit = scene.pickWithRay(ray);
    let target = hit.pickedMesh;
    if (target && target.name != "skyBox") {
      const countToDelete = activeObj.instances.length;
      for (let i = 0; i < countToDelete; i++) {
        activeObj.instances[activeObj.instances.length - 1].dispose();
      }
      CreateVolume(activeObj);
      camera.position = startCameraPos;
      line.isVisible = false;
    }
  };*/
};

const Render = (scene) => {};

const Scene3 = ({ lists }) => {
  meta = lists;
  return (
    <SceneComponent
      antialias
      onSceneReady={(scene) => Ready(scene, lists)}
      onRender={Render}
      id="my-canvas"
    />
  );
};

export default Scene3;
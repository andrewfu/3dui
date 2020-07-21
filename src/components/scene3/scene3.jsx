import React from "react";
import SceneComponent from "babylonjs-hook";

import Prepare from "./prepare";
import CreateSkybox from "./skybox";
import CreateFullSceenUI from "./full-sceen-ui";
import CreateBaseMeshes from "./base-mesh";
import CreateVolume from "./volume";
import SetupPointerLock from "./pointer-lock";
import { useEffect } from "react";
import { Vector3 } from "@babylonjs/core";

let baseMeshes = null;
let meta = null;
let sceneRef = null;
const Ready = (scene) => {
  sceneRef = scene;
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
const Search = (text) => {
  if (text.length <= 2) return;
  const list = meta.find((i) => i.name.toUpperCase().indexOf(text.toUpperCase()) > -1);
  if (list && baseMeshes.length > 0) {
    const instance = baseMeshes[0].instances.find((i) => i.name == list.id);
    const position = instance.absolutePosition;
    //console.log(instance.getBoundingInfo().boundingBox);
    //console.log(instance.getBoundingInfo().boundingBox.centerWorld);

    //sceneRef.cameras[0].position.x = instance.position.x;
    //sceneRef.cameras[0].position.y = instance.position.y;
    //sceneRef.cameras[0].position = instance.position.add(new Vector3(0, 0, 5)); //instance.getBoundingInfo().boundingBox.maximumWorld; //new Vector3(position.x - 10, position.y - 10, position.z - 10);
    sceneRef.cameras[0].setTarget(instance.getBoundingInfo().boundingBox.minimumWorld);
    //console.log(instance.position.z);
    //console.log(sceneRef.cameras[0].position.z);
    //sceneRef.cameras[0].radius = 1;
    //sceneRef.cameras[0].target = instance.position;
  }
};

const Render = (scene) => {};

const Scene3 = ({ lists, objectToSearch }) => {
  meta = lists;
  useEffect(() => {
    objectToSearch && Search(objectToSearch);
  }, [objectToSearch]);
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

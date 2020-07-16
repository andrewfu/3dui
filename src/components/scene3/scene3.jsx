import React from "react";
import SceneComponent from "babylonjs-hook";
import {
  Vector3,
  FreeCamera,
  StandardMaterial,
  CubeTexture,
  Color3,
  MeshBuilder,
  Texture,
  Color4,
  Matrix,
} from "@babylonjs/core";

import { AdvancedDynamicTexture, Line, Control, Button } from "@babylonjs/gui";

import nx from "../../textures/1_nx.jpg";
import ny from "../../textures/1_ny.jpg";
import nz from "../../textures/1_nz.jpg";
import px from "../../textures/1_px.jpg";
import py from "../../textures/1_py.jpg";
import pz from "../../textures/1_pz.jpg";

const files = [px, py, pz, nx, ny, nz];

let activeObj = null;
let activeInstance = null;

const Ready = (scene) => {
  const startCameraPos = new Vector3(30, 15, -100);
  var camera = new FreeCamera("camera1", startCameraPos, scene);
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  camera.angularSensibility = 5000;
  scene.createDefaultLight();

  var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture("", scene, null, false, files);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  var ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  activeObj = MeshBuilder.CreateSphere("baseSphere", { segments: 16, diameter: 2 });
  activeObj.isVisible = false;

  activeObj.registerInstancedBuffer("color", 4);
  activeObj.instancedBuffers.color = new Color4(1, 1, 1, 1);

  CreateVolume(activeObj);

  const btn1 = CreateBottomPanel(ui);

  var isLocked = false;
  var line = new Line();
  line.alpha = 0.5;
  line.lineWidth = 5;
  line.dash = [5, 10];
  line.isVisible = false;
  ui.addControl(line);
  line.connectedControl = btn1;

  scene.onPointerMove = () => {
    var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera);
    var hit = scene.pickWithRay(ray);
    if (hit.pickedMesh) {
      const length = Math.ceil(hit.pickedMesh.position.subtract(camera.position).length());
      btn1.text = `${hit.pickedMesh.name}-${length}`;
      line.linkWithMesh(hit.pickedMesh);
      line.isVisible = true;
      //activeInstance = hit.pickedMesh;
    } else {
      btn1.text = "";
      line.isVisible = false;
      line.linkWithMesh(null);
      //activeInstance = null;
    }
  };

  scene.onPointerDown = () => {
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
    if (target) {
      const countToDelete = activeObj.instances.length;
      for (let i = 0; i < countToDelete; i++) {
        activeObj.instances[activeObj.instances.length - 1].dispose();
      }
      CreateVolume(activeObj);
      camera.position = startCameraPos;
      line.isVisible = false;
    }
  };
  var pointerlockchange = function () {
    var controlEnabled =
      document.mozPointerLockElement ||
      document.webkitPointerLockElement ||
      document.msPointerLockElement ||
      document.pointerLockElement ||
      null;

    if (!controlEnabled) {
      isLocked = false;
    } else {
      isLocked = true;
    }
  };

  document.addEventListener("pointerlockchange", pointerlockchange, false);
  document.addEventListener("mspointerlockchange", pointerlockchange, false);
  document.addEventListener("mozpointerlockchange", pointerlockchange, false);
  document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

  scene.registerBeforeRender(() => {
    if (activeInstance) {
      let color = activeInstance.instancedBuffers.color;
      activeInstance.instancedBuffers.color = new Color4(color.r, color.g, color.b, Math.random());
    }
  });
};

const Render = (scene) => {};

const CreateBottomPanel = (ui) => {
  const btn = Button.CreateSimpleButton("but");

  btn.width = "350px";
  btn.height = "40px";
  btn.color = "white";
  btn.cornerRadius = 20;
  btn.background = "green";
  btn.alpha = "0.5";
  btn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  btn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  ui.addControl(btn);

  return btn.textBlock;
};

const GetRandomInt = (seed) => Math.ceil(Math.random() * seed);

const CreateVolume = (
  baseObj,
  count = GetRandomInt(100),
  xDim = GetRandomInt(10),
  yDim = GetRandomInt(10),
  scale = 10
) => {
  for (let i = 0; i < count; i++) {
    let instance = baseObj.createInstance(`${baseObj.name}${i}`);
    const x = i % xDim;
    const y = ((i - x) / xDim) % yDim;
    const z = ((i - x) / xDim - y) / yDim;
    instance.position.x = x * scale;
    instance.position.y = y * scale;
    instance.position.z = z * scale;
    const s = GetRandomInt(3);
    instance.scaling = new Vector3(s, s, s);
    instance.instancedBuffers.color = new Color4(
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
};

const Scene3 = () => {
  return <SceneComponent antialias onSceneReady={Ready} onRender={Render} id="my-canvas" />;
};

export default Scene3;

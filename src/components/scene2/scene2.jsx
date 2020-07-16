import React, { useEffect } from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  ArcRotateCamera,
  TransformNode,
  Color3,
  CubeTexture,
  Texture,
  StandardMaterial,
} from "@babylonjs/core";
import SceneComponent from "babylonjs-hook";
import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { CylinderPanel } from "@babylonjs/gui/3D/controls/cylinderPanel";
import { HolographicButton } from "@babylonjs/gui/3D/controls/holographicButton";
import scene from "../scene/scene";

const magenta = new Color3(226 / 255, 0, 116 / 255);
const colors = [
  new Color3(0, 123 / 255, 1),
  new Color3(40 / 255, 167 / 255, 69 / 255),
  magenta,
  new Color3(108 / 255, 117 / 255, 125 / 255),
];

let panelRef = null;

const onSceneReady = (scene, panelSize) => {
  const camera = new ArcRotateCamera(
    "camera1",
    -Math.PI / 2,
    Math.PI / 2,
    5,
    Vector3.Zero(),
    scene
  );
  camera.minZ = 0.001;
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  var light = new HemisphericLight("light", Vector3.Up(), scene);
  light.intensity = 0.7;

  var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture("textures/1", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  var anchor = new TransformNode("");
  var manager = new GUI3DManager(scene);
  var panel = new CylinderPanel();
  panel.name = "panel1";
  panel.margin = 0.2;

  manager.addControl(panel);
  panel.linkToTransformNode(anchor);
  CreateBtns(panel, panelSize);
  panelRef = panel;
};
const CreateBtns = (panel, num) => {
  panel.blockLayout = true;
  for (var index = 0; index < num; index++) {
    var button = new HolographicButton(`btn-name-${index}`, false);
    panel.addControl(button);
    button.text = "Button #" + panel.children.length;
    button.onPointerClickObservable.add((_, i) => {
      if (Math.ceil(i.target.scaling.x) == 7) {
        i.target.scaling = new Vector3(1, 1, 1);
        i.target.parent.children.forEach((btn) => {
          btn.isVisible = true;
        });
        i.target.backMaterial.alpha = 0.8;
      } else {
        i.target.scaling = new Vector3(7, 7, 7);
        i.target.parent.children.forEach((btn) => {
          if (btn.name != i.target.name) btn.isVisible = false;
        });
        i.target.backMaterial.alpha = 1;
        panel.scene.activeCamera.setTarget(i.target.position);
      }
    });
    let colorIndex = Math.random() * colors.length;
    button.backMaterial.albedoColor = colors[Math.floor(colorIndex)];
    button.backMaterial.alpha = 0.8;
    button.backMaterial.hoverRadius = 0.8;
  }
  panel.blockLayout = false;
};

const onRender = (scene) => {};

export default ({ panelSize = 50 }) => {
  useEffect(() => {
    if (panelRef && panelSize != panelRef.children.length) {
      for (let i = panelRef.children.length - 1; i >= 0; i--) {
        panelRef.removeControl(panelRef.children[i]);
      }
      CreateBtns(panelRef, panelSize);
    }
  }, [panelSize]);
  return (
    <SceneComponent
      antialias
      onSceneReady={(scene) => onSceneReady(scene, panelSize)}
      onRender={onRender}
      id="my-canvas"
    />
  );
};

import React, { useState, useEffect } from "react";
import { Scene as S, Engine, Skybox } from "react-babylonjs";
import {
  Vector3,
  Texture,
  Color3,
  FresnelParameters,
  MeshBuilder,
  StandardMaterial,
  SceneLoader,
  TransformNode,
} from "@babylonjs/core";
import { GUI3DManager, CylinderPanel, MeshButton3D, TextBlock, Button } from "babylonjs-gui";
import { HolographicButton } from "@babylonjs/gui/3D/controls/holographicButton";
const magenta = new Color3(226 / 255, 0, 116 / 255);
const colors = [
  new Color3(0, 123 / 255, 1),
  new Color3(40 / 255, 167 / 255, 69 / 255),
  magenta,
  new Color3(108 / 255, 117 / 255, 125 / 255),
];
let scene = null;
let panel = null;
export default ({ panelSize = 50 }) => {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
      canvasStyle={{ width: "100%", height: "100%" }}
    >
      <S onSceneMount={(e) => (scene = e.scene)} key={`scene${panelSize}`}>
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <Skybox rootUrl="textures/1"></Skybox>
        <arcRotateCamera
          target={Vector3.Zero()}
          radius={5}
          alpha={-Math.PI / 2}
          beta={Math.PI / 2}
          minZ={0.001}
          wheelPrecision={50}
        />
        <gui3DManager name={`gui3d${panelSize}`} key={`gui3d${panelSize}`}>
          <cylinderPanel
            name={`panel${panelSize}`}
            margin={0.2}
            ref={(el) => (panel = el)}
            key={`panel${panelSize}`}
          >
            {Array.from(new Array(panelSize), (_, index) => index).map((number) => {
              return (
                <holographicButton
                  key={`btn-${panelSize}-${number}`}
                  name={`btn-name-${panelSize}-${number}`}
                  text={`btn-text-${panelSize}-${number}`}
                  shareMaterials={false}
                  onPointerClickObservable={(e, i) => {
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
                      scene.activeCamera.setTarget(i.target.position);
                    }
                  }}
                  onControlAdded={(i) => {
                    let colorIndex = Math.random() * colors.length;
                    i.hostInstance.backMaterial.albedoColor = colors[Math.floor(colorIndex)];
                    i.hostInstance.backMaterial.alpha = 0.8;
                    i.hostInstance.backMaterial.hoverRadius = 0.8;
                  }}
                ></holographicButton>
              );
            })}
          </cylinderPanel>
        </gui3DManager>
      </S>
    </Engine>
  );
};

import { StandardMaterial, CubeTexture, Color3, MeshBuilder, Texture } from "@babylonjs/core";

import nx from "../../textures/1_nx.jpg";
import ny from "../../textures/1_ny.jpg";
import nz from "../../textures/1_nz.jpg";
import px from "../../textures/1_px.jpg";
import py from "../../textures/1_py.jpg";
import pz from "../../textures/1_pz.jpg";

const files = [px, py, pz, nx, ny, nz];

export default (scene) => {
  var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture("", scene, null, false, files);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
};

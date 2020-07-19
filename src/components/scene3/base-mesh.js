import { MeshBuilder, Color4, DynamicTexture, StandardMaterial, Mesh } from "@babylonjs/core";
import { COLOR_BUFFER, BASE_CUBE } from "../../utl/const";

//import folder from "../../textures/folder.png";

export default () => {
  const baseMeshes = [];
  let obj = MeshBuilder.CreateSphere(BASE_CUBE, { segments: 16, diameter: 2 });
  //obj.billboardMode = Mesh.BILLBOARDMODE_ALL;

  /*var size = 512;
  var textureGround = new DynamicTexture("dynamic texture", size);
  var textureContext = textureGround.getContext();

  var materialGround = new StandardMaterial("Mat");
  materialGround.diffuseTexture = textureGround;
  obj.material = materialGround;*/

  /*var img = new Image();
  img.src = folder;
  img.onload = function () {
    textureContext.drawImage(this, 0,0,512,512);
    textureGround.update();
  };*/

  obj.isVisible = false;

  obj.registerInstancedBuffer(COLOR_BUFFER, 4);
  obj.instancedBuffers[COLOR_BUFFER] = new Color4(1, 1, 1, 1);
  baseMeshes.push(obj);
  return baseMeshes;
};

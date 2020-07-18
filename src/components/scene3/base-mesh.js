import { MeshBuilder, Color4 } from "@babylonjs/core";
import { BASE_SPHERE, COLOR_BUFFER } from "../../utl/const";

export default () => {
  const baseMeshes = [];
  let obj = MeshBuilder.CreateSphere(BASE_SPHERE, { segments: 16, diameter: 2 });
  obj.isVisible = false;

  obj.registerInstancedBuffer(COLOR_BUFFER, 4);
  obj.instancedBuffers.color = new Color4(1, 1, 1, 1);
  baseMeshes.push(obj);
  return baseMeshes;
};

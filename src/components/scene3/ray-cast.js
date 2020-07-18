import { Matrix } from "@babylonjs/core";
import { SKYBOX } from "../../utl/const";

const meshFilter = [SKYBOX];

export default (scene) => {
  const ray = scene.createPickingRay(
    scene.pointerX,
    scene.pointerY,
    Matrix.Identity(),
    scene.activeCameras[0]
  );
  const hit = scene.pickWithRay(ray);
  if (
    hit.pickedMesh &&
    meshFilter.findIndex((name) => name.toUpperCase() == hit.pickedMesh.name.toUpperCase()) == -1
  )
    return hit.pickedMesh;
  return null;
};

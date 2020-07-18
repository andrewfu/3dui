import { PointerEventTypes } from "@babylonjs/core";

let isLocked = false;

const PointerLockChange = () => {
  var controlEnabled = document.pointerLockElement || null;
  if (!controlEnabled) {
    isLocked = false;
  } else {
    isLocked = true;
  }
};

export default (scene) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  document.addEventListener("pointerlockchange", PointerLockChange, false);
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type == PointerEventTypes.POINTERDOWN) {
      !isLocked && canvas.requestPointerLock && canvas.requestPointerLock();
    }
  });
};

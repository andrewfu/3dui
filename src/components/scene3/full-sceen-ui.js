import { PointerEventTypes } from "@babylonjs/core";
import { AdvancedDynamicTexture, Line, Control, Button } from "@babylonjs/gui";
import RayCast from "./ray-cast";

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

const CreateLine = (ui) => {
  const line = new Line();
  line.alpha = 0.5;
  line.lineWidth = 5;
  line.dash = [5, 10];
  line.isVisible = false;
  ui.addControl(line);
  return line;
};

export default (scene) => {
  var ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  const btn1 = CreateBottomPanel(ui);
  const line = CreateLine(ui);
  line.connectedControl = btn1;

  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type == PointerEventTypes.POINTERMOVE) {
      const mesh = RayCast(scene);
      if (mesh) {
        const length = Math.ceil(mesh.position.subtract(scene.cameras[0].position).length());
        btn1.text = `${mesh.name}-${length}`;
        line.linkWithMesh(mesh);
        line.isVisible = true;
      } else {
        btn1.text = "";
        line.isVisible = false;
        line.linkWithMesh(null);
      }
    }
  });
};

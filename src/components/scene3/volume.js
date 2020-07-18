import { GetRandomInt } from "../../utl/common";
import { Vector3, Color4 } from "@babylonjs/core";

export default ({
  baseMeshes,
  count = GetRandomInt(100),
  xDim = GetRandomInt(10),
  yDim = GetRandomInt(10),
  scale = 10,
  maxSize = 3,
}) => {
  for (let i = 0; i < count; i++) {
    let instance = baseMeshes[0].createInstance(`${baseMeshes[0].name}${i}`);
    const x = i % xDim;
    const y = ((i - x) / xDim) % yDim;
    const z = ((i - x) / xDim - y) / yDim;
    instance.position.x = x * scale;
    instance.position.y = y * scale;
    instance.position.z = z * scale;
    const s = GetRandomInt(maxSize);
    instance.scaling = new Vector3(s, s, s);
    instance.instancedBuffers.color = new Color4(
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
};

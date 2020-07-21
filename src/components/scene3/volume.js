import { GetRandomInt } from "../../utl/common";
import { Vector3, Color4 } from "@babylonjs/core";

export default ({
  baseMeshes,
  objects = [],
  xDim = GetRandomInt(10),
  yDim = GetRandomInt(10),
  distance = 20,
  maxSize = 5,
}) => {
  const maxItemsCount = Math.max(...objects.map((i) => i.count));
  for (let i = 0; i < objects.length; i++) {
    let instance = baseMeshes[0].createInstance(objects[i].id);
    const x = i % xDim;
    const y = ((i - x) / xDim) % yDim;
    const z = ((i - x) / xDim - y) / yDim;
    instance.position.x = x * distance;
    instance.position.y = y * distance;
    instance.position.z = z * distance;
    let s = Math.ceil((objects[i].count / maxItemsCount) * maxSize);
    s = s == 0 ? 1 : s;
    instance.scaling = new Vector3(s, s, s);
    instance.instancedBuffers.color = new Color4(
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
};

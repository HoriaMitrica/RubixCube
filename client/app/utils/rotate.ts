import { Cubie } from "@/models/cubie";
import * as THREE from 'three';

export const rotateGroup = (initialCubies:Cubie[],groupIndices: number[], axis: THREE.Vector3, angle: number):Cubie[] => {

    const localCubies = initialCubies.map(cubie => ({
      ...cubie,
      rotation: cubie.rotation.clone(),
      currentIndex: cubie.currentIndex,
    }));
    let newCubies: Cubie[] = [];
    for (let index: number = 0; index < groupIndices.length - 1; index++) {

      const cubie: Cubie | undefined = localCubies.find((cube: Cubie) => cube.currentIndex === groupIndices[index]);
      if (cubie) {
        newCubies.push(cubie);
      }
    }
    newCubies.forEach((cubie: Cubie, index: number) => {
      const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      const currentQuaternion = new THREE.Quaternion().copy(cubie.rotation);
      currentQuaternion.multiplyQuaternions(quaternion, currentQuaternion);
      cubie.rotation.copy(currentQuaternion);

      if (axis.x < 0 || axis.y < 0 || axis.z < 0) {
        cubie.currentIndex = groupIndices[(index + 2) % (groupIndices.length - 1)];
      }
      if (axis.x > 0 || axis.y > 0 || axis.z > 0) {
        let newIndex: number = index - 2;
        if (newIndex < 0) {
          newIndex = groupIndices.length - 1 + newIndex
        }
        cubie.currentIndex = groupIndices[newIndex];
      }
    });
    return localCubies;
  };
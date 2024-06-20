
import * as THREE from 'three'
import React, { useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { BACK_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, FRONT_LAYER_INDEXES, INITIAL_POSITIONS, LEFT_LAYER_INDEXES, RIGHT_LAYER_INDEXES, ROTATION_ANGLE, TOP_LAYER_INDEXES, X_CLOCKWISE_ROTATION, X_COUNTERCLOCKWISE_ROTATION, Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION, Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION } from '@/constants/constants'
import { Cubie } from '@/models/cubie'
import './style.scss'

export const RubiksCube3x3 = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/RubiksCube3x3.glb');
  const [cubies, setCubies] = useState<Cubie[]>(INITIAL_POSITIONS);

  const rotateGroup = (groupIndices: number[], axis: THREE.Vector3, angle: number) => {

    const localCubies = cubies.map(cubie => ({
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
    setCubies(localCubies);
  };

  return (
    <>
      <group {...props} dispose={null}>

        <mesh geometry={(nodes.Center as THREE.Mesh).geometry} material={materials.Black} />
        {cubies?.map((cubie, index) => (cubie.name != "Center" &&
          <group key={index} rotation={new THREE.Euler().setFromQuaternion(cubie.rotation)}>
            {nodes[`${cubie.name}`] &&
              <mesh geometry={(nodes[`${cubie.name}_1`] as THREE.Mesh).geometry} material={materials.Black} />
            }
            {
              nodes[`${cubie.name}`] &&
              cubie.name.split('_').map((color: string, color_index: number) => (<mesh key={color_index} geometry={(nodes[`${cubie.name}_${color_index + 2}`] as THREE.Mesh).geometry} material={materials[color]} />))
            }
          </group>
        ))}
        <Html className="container">
            <button className="button" onClick={() => rotateGroup(TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>U</button>
            <button className="button" onClick={() => rotateGroup(TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>U&apos;</button>

            <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>D</button>
            <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>D&apos;</button>


            <button className="button" onClick={() => rotateGroup(FRONT_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>F</button>
            <button className="button" onClick={() => rotateGroup(FRONT_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>F&apos;</button>

            <button className="button" onClick={() => rotateGroup(BACK_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>B</button>
            <button className="button" onClick={() => rotateGroup(BACK_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>B&apos;</button>

            <button className="button" onClick={() => rotateGroup(RIGHT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>R</button>
            <button className="button" onClick={() => rotateGroup(RIGHT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>R&apos;</button>

            <button className="button" onClick={() => rotateGroup(LEFT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>L</button>
            <button className="button" onClick={() => rotateGroup(LEFT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>L&apos;</button>
        </Html>
      </group>

    </>
  )
}

useGLTF.preload('/models/RubiksCube3x3.glb')

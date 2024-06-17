
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { BOTTOM_LAYER_INDEXES, INITIAL_POSITIONS, MIDDLE_LAYER_INDEXES, ROTATION_ANGLE, TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION } from '@/constants/constants'
import { Cubie } from '@/models/cubie'
import './style.scss'

export const RubiksCube3x3 = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/RubiksCube3x3.glb');
  const [cubies, setCubies] = React.useState<Cubie[]>(INITIAL_POSITIONS);

  const rotateGroup = (groupIndices: number[], axis: THREE.Vector3, angle: number) => {
    const newCubies = [...cubies];
    groupIndices.forEach(index => {
      const cubie = newCubies[index];
      const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      const currentQuaternion = new THREE.Quaternion().copy(cubie.rotation);
      currentQuaternion.multiplyQuaternions(quaternion, currentQuaternion);
      cubie.rotation.copy(currentQuaternion);
    });
    setCubies(newCubies);
  };

  return (
    <>
      <group {...props} dispose={null}>


        {cubies?.map((cubie, index) => (
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

      </group>
        <Html>
          <div className="container">
            <div className="canvas-container" />
            <div className="buttons-container">
              <button className="button" onClick={() => rotateGroup(TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>U</button>
              <button className="button" onClick={() => rotateGroup(TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>U'</button>
              
              <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>D</button>
              <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>D'</button>
            </div>
          </div>
        </Html>
    </>
  )
}

useGLTF.preload('/models/RubiksCube3x3.glb')

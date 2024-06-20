
import * as THREE from 'three'
import React, { useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { BACK_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, FRONT_LAYER_INDEXES, INITIAL_POSITIONS, ROTATION_ANGLE, TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION, Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION } from '@/constants/constants'
import { Cubie } from '@/models/cubie'
import './style.scss'

export const RubiksCube3x3 = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/RubiksCube3x3.glb');
  const [cubies, setCubies] = useState<Cubie[]>(INITIAL_POSITIONS);

  const rotateGroup = (groupIndices: number[], axis: THREE.Vector3, angle: number) => {

    const newCubies = [...cubies];
    
    for (let index = 0; index < groupIndices.length-1; index++) {
      const cubie: Cubie | undefined = newCubies.find((cube: Cubie) => cube.currentIndex === groupIndices[index]);
      if (cubie) {
        const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
        const currentQuaternion = new THREE.Quaternion().copy(cubie.rotation);
        currentQuaternion.multiplyQuaternions(quaternion, currentQuaternion);
        cubie.rotation.copy(currentQuaternion);


      }
    }
    console.log(newCubies);
    setCubies(newCubies);
  };

  return (
    <>
      <group {...props} dispose={null}>

        <mesh geometry={(nodes.Center as THREE.Mesh).geometry} material={materials.Black} />
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
            <button className="button" onClick={() => rotateGroup(TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>U&apos;</button>

            <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>D</button>
            <button className="button" onClick={() => rotateGroup(BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>D&apos;</button>


            <button className="button" onClick={() => rotateGroup(FRONT_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>F</button>
            <button className="button" onClick={() => rotateGroup(FRONT_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>F&apos;</button>

            <button className="button" onClick={() => rotateGroup(BACK_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>B</button>
            <button className="button" onClick={() => rotateGroup(BACK_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>B&apos;</button>
          </div>
        </div>
      </Html>
    </>
  )
}

useGLTF.preload('/models/RubiksCube3x3.glb')

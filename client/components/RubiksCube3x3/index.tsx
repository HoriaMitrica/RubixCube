
import * as THREE from 'three'
import React from 'react'
import { Html, useGLTF } from '@react-three/drei'

import { RubikCubeProps } from '@/models/cube'


export const RubiksCube3x3:React.FC<RubikCubeProps> = ({cubies}) => {
  const { nodes, materials } = useGLTF('/models/RubiksCube3x3.glb');



  return (
    <>
      <group dispose={null}>

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
      </group>

    </>
  )
}

useGLTF.preload('/models/RubiksCube3x3.glb')

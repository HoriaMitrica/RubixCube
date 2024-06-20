"use client"

import React from 'react'
import { RubiksCube3x3 } from "@/components/RubiksCube3x3/index"
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
const User = () => {
    return (
        <>
            <Canvas style={{width:"100%", height:"100vh", background:"lightblue"} }>
                <ambientLight intensity={4} />
                <OrbitControls />
                <axesHelper/>
                <RubiksCube3x3 />
            </Canvas>
        </>
    )
}
export default User


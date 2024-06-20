"use client"

import React, { useState } from 'react'
import { RubiksCube3x3 } from "@/components/RubiksCube3x3/index"
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import './style.scss'
import { rotateGroup } from '@/utils/rotate'
import { BACK_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, FRONT_LAYER_INDEXES, INITIAL_POSITIONS, LEFT_LAYER_INDEXES, RIGHT_LAYER_INDEXES, ROTATION_ANGLE, TOP_LAYER_INDEXES, X_CLOCKWISE_ROTATION, X_COUNTERCLOCKWISE_ROTATION, Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION, Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION } from '@/constants/constants'
import { Cubie } from '@/models/cubie'

const Cube = () => {

    const [cubies, setCubies] = useState<Cubie[]>(INITIAL_POSITIONS);

    return (
        <>
            <Canvas style={{ width: "100%", height: "100vh", background: "lightblue" }}>
                <ambientLight intensity={4} />
                <OrbitControls />
                <axesHelper />
                <RubiksCube3x3 cubies={cubies} />
            </Canvas>
            <div className="grid-container">

                <button className="button" id="up-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>U</button>
                <button className="button" id="up-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>U&apos;</button>

                <button className="button" id="left-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, LEFT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>L&apos;</button>
                <button className="button" id="front-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, FRONT_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>F&apos;</button>
                <button className="button" id="front-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, FRONT_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>F</button>
                <button className="button" id="right-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, RIGHT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>R</button>

                <button className="button" id="left-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, LEFT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>L</button>
                <button className="button" id="back-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, BACK_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>B</button>
                <button className="button" id="back-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, BACK_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>B&apos;</button>
                <button className="button" id="right-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, RIGHT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>R&apos;</button>

                <button className="button" id="down-clockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE))}>D</button>
                <button className="button" id="down-counterclockwise" onClick={() =>
                    setCubies(rotateGroup(cubies, BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE))}>D&apos;</button>

            </div >
        </>
    )
}
export default Cube


"use client"

import React, { useState } from 'react'
import { RubiksCube3x3 } from "@/components/RubiksCube3x3/index"
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import './style.scss'
import { rotateGroup } from '@/utils/rotate'
import { BACK_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, FRONT_LAYER_INDEXES, INITIAL_POSITIONS, LEFT_LAYER_INDEXES, RIGHT_LAYER_INDEXES, ROTATION_ANGLE, ROTATION_DURATION, TOP_LAYER_INDEXES, X_CLOCKWISE_ROTATION, X_COUNTERCLOCKWISE_ROTATION, Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION, Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION } from '@/constants/constants'
import { Cubie } from '@/models/cubie'
import * as THREE from 'three';

const Cube = () => {

    const [cubies, setCubies] = useState<Cubie[]>(INITIAL_POSITIONS);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);


    return (
        <>
            <Canvas style={{ width: "100%", height: "100vh", background: "lightblue" }}>
                <ambientLight intensity={4} />
                <OrbitControls />
                <axesHelper />
                <RubiksCube3x3 cubies={cubies} />
            </Canvas>
            <div className="grid-container">

                <button disabled={isAnimating} className="button" id="up-clockwise" onClick={() =>
                    rotateGroup(cubies, TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>U</button>
                <button disabled={isAnimating} className="button" id="up-counterclockwise" onClick={() =>
                    rotateGroup(cubies, TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>U&apos;</button>

                <button className="button" id="left-counterclockwise" onClick={() =>
                    rotateGroup(cubies, LEFT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>L&apos;</button>
                <button className="button" id="front-counterclockwise" onClick={() =>
                    rotateGroup(cubies, FRONT_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>F&apos;</button>
                <button className="button" id="front-clockwise" onClick={() =>
                    rotateGroup(cubies, FRONT_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>F</button>
                <button className="button" id="right-clockwise" onClick={() =>
                    rotateGroup(cubies, RIGHT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>R</button>

                <button className="button" id="left-clockwise" onClick={() =>
                    rotateGroup(cubies, LEFT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>L</button>
                <button className="button" id="back-clockwise" onClick={() =>
                    rotateGroup(cubies, BACK_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>B</button>
                <button className="button" id="back-counterclockwise" onClick={() =>
                    rotateGroup(cubies, BACK_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>B&apos;</button>
                <button className="button" id="right-counterclockwise" onClick={() =>
                    rotateGroup(cubies, RIGHT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>R&apos;</button>

                <button className="button" id="down-clockwise" onClick={() =>
                    rotateGroup(cubies, BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>D</button>
                <button className="button" id="down-counterclockwise" onClick={() =>
                    rotateGroup(cubies, BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE, ROTATION_DURATION, setCubies)}>D&apos;</button>

            </div >
        </>
    )
}
export default Cube


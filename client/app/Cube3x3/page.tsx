"use client"
import React, { useState, useCallback, useRef } from 'react';
import { RubiksCube3x3 } from "@/components/RubiksCube3x3/index";
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import './style.scss';
import { rotateGroup } from '@/utils/rotate';
import { scrambleCube } from '@/utils/scramble';
import {
    BACK_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, EQUATOR_LAYER_INDEXES, FRONT_LAYER_INDEXES,
    INITIAL_POSITIONS, LEFT_LAYER_INDEXES, MIDDLE_LAYER_INDEXES, RIGHT_LAYER_INDEXES,
    ROTATION_ANGLE, ROTATION_DURATION, SCRAMBLE_MOVES_COUNT, SCRAMBLE_ROTATION_DURATION, SLICE_LAYER_INDEXES, TOP_LAYER_INDEXES,
    X_CLOCKWISE_ROTATION, X_COUNTERCLOCKWISE_ROTATION, Y_CLOCKWISE_ROTATION,
    Y_COUNTERCLOCKWISE_ROTATION, Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION
} from '@/constants/constants';
import { Cubie } from '@/models/cubie';
import * as THREE from 'three';

const Cube = () => {
    const [cubies, setCubies] = useState<Cubie[]>(INITIAL_POSITIONS);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isDraggingCube, setIsDraggingCube] = useState(false);
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const handleRotation = useCallback((
        groupIndices: number[],
        axis: THREE.Vector3,
        angle: number
    ) => {
        if (isAnimating) return;

        rotateGroup(
            cubies,
            groupIndices,
            axis,
            angle,
            ROTATION_DURATION,
            setCubies,
            setIsAnimating
        );
    }, [cubies, isAnimating]);

    const handleScramble = useCallback(() => {
        if (isAnimating) return;

        scrambleCube(
            cubies,
            rotateGroup,
            setCubies,
            setIsAnimating,
            SCRAMBLE_MOVES_COUNT,
            SCRAMBLE_ROTATION_DURATION
        );
    }, [cubies, isAnimating]);

    const handleReset = useCallback(() => {
        if (isAnimating) return;
        setCubies(INITIAL_POSITIONS);
    }, [isAnimating]);

    return (
        <>
<Canvas style={{ width: "100%", height: "100vh", background: "lightblue" }}>
            <ambientLight intensity={4} />
            <OrbitControls 
                ref={controlsRef}
                enabled={!isDraggingCube && !isAnimating} 
            />
            <axesHelper />
            <RubiksCube3x3 
                cubies={cubies} 
                isAnimating={isAnimating} 
                onRotationStart={handleRotation}
                onCubiePointerDown={() => setIsDraggingCube(true)}
                onCubiePointerUp={() => setIsDraggingCube(false)}
            />
        </Canvas>

            {/* <div className="controls-container">
                <div className="action-buttons">
                    <button
                        disabled={isAnimating}
                        className="scramble-button"
                        onClick={handleScramble}
                    >
                        Scramble Cube
                    </button>
                    <button
                        disabled={isAnimating}
                        className="reset-button"
                        onClick={handleReset}
                    >
                        Reset Cube
                    </button>
                </div>

                <div className="grid-container">
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(TOP_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>U</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(TOP_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>U&apos;</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(LEFT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>L</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(FRONT_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>F</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(FRONT_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>F&apos;</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(RIGHT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>R</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(LEFT_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>L&apos;</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(BACK_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>B</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(BACK_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>B&apos;</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(RIGHT_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>R&apos;</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(BOTTOM_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>D</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(BOTTOM_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>D&apos;</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(EQUATOR_LAYER_INDEXES, Y_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>E</button>
                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(EQUATOR_LAYER_INDEXES, Y_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>E&apos;</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(MIDDLE_LAYER_INDEXES, X_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>M</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(MIDDLE_LAYER_INDEXES, X_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>M&apos;</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(SLICE_LAYER_INDEXES, Z_CLOCKWISE_ROTATION, ROTATION_ANGLE)}>S</button>

                    <button disabled={isAnimating} className="button" onClick={() =>
                        handleRotation(SLICE_LAYER_INDEXES, Z_COUNTERCLOCKWISE_ROTATION, ROTATION_ANGLE)}>S&apos;</button>
                </div>
            </div> */}
        </>
    );
};

export default Cube;
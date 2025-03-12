import { Cubie } from "./cubie";
import * as THREE from 'three';
export interface RubikCubeProps{
    cubies:Cubie[],
    onRotationStart:(
        groupIndices: number[],
        axis: THREE.Vector3,
        angle: number
    )=>void,
    isAnimating:boolean,
    onCubiePointerDown?: () => void,
    onCubiePointerUp?: () => void
}
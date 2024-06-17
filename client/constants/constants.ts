import * as THREE from 'three'
import { Cubie } from '../models/cubie';

export const INITIAL_POSITIONS: Cubie[] = [

    // Top layer (y = 0)

    { name: 'Blue_White_Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Blue_Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Blue_Yellow_Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Blue_White', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Blue', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Blue_Yellow', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Blue_White', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Blue', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Blue_Yellow', rotation: new THREE.Quaternion(0, 0, 0) },

    // Middle layer (y = 0)

    { name: 'White_Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Yellow_Orange', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'White', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Yellow', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_White', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Yellow', rotation: new THREE.Quaternion(0, 0, 0) },

    // Bottom layer (y = -0)

    { name: 'White_Orange_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Orange_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Yellow_Orange_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'White_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Yellow_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_White_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Green', rotation: new THREE.Quaternion(0, 0, 0) },
    { name: 'Red_Yellow_Green', rotation: new THREE.Quaternion(0, 0, 0) },
];
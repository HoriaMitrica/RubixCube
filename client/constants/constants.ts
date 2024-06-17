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


export const TOP_LAYER_INDEXES=[0,1,2,3,4,5,6,7,8];
export const MIDDLE_LAYER_INDEXES=[9,10,11,12,13,14,15,16];
export const BOTTOM_LAYER_INDEXES=[17,18,19,20,21,22,23,24,25];

export const Y_CLOCKWISE_ROTATION=new THREE.Vector3(0, -1, 0);
export const Y_COUNTERCLOCKWISE_ROTATION=new THREE.Vector3(0, 1, 0);
export const X_CLOCKWISE_ROTATION=new THREE.Vector3(0, -1, 0);
export const X_COUNTERCLOCKWISE_ROTATION=new THREE.Vector3(0, 1, 0);
export const Z_CLOCKWISE_ROTATION=new THREE.Vector3(0, -1, 0);
export const Z_COUNTERCLOCKWISE_ROTATION=new THREE.Vector3(0, 1, 0);

export const ROTATION_ANGLE=Math.PI/2; //90 deg
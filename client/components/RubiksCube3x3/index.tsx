import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { RubikCubeProps } from '@/models/cube'

export const RubiksCube3x3: React.FC<RubikCubeProps> = ({ 
  cubies, 
  onRotationStart, 
  isAnimating,
  onCubiePointerDown,
  onCubiePointerUp
}) => {
  const { nodes, materials } = useGLTF('/models/RubiksCube3x3.glb');
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [dragStart, setDragStart] = useState<THREE.Vector2 | null>(null);

  const clickInfo = useRef<{
    position: THREE.Vector3,
    normal: THREE.Vector3,
    screenPosition: THREE.Vector2
  } | null>(null);

  const handleCubiePointerDown = (cubieIndex: number, cubieName: string) => (e: ThreeEvent<PointerEvent>) => {
    if (isAnimating) return;

    e.stopPropagation();
    onCubiePointerDown?.();

    setDragStart(new THREE.Vector2(e.clientX, e.clientY));

    clickInfo.current = {
      position: e.point.clone(),
      normal: e.face!.normal.clone(),
      screenPosition: new THREE.Vector2(
        (e.clientX / gl.domElement.clientWidth) * 2 - 1,
        -(e.clientY / gl.domElement.clientHeight) * 2 + 1
      )
    };
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isAnimating || !dragStart) return;
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    onCubiePointerUp?.();
    
    if (isAnimating || !dragStart || !clickInfo.current) {
      setDragStart(null);
      return;
    }

    const endScreenPosition = new THREE.Vector2(
      (e.clientX / gl.domElement.clientWidth) * 2 - 1,
      -(e.clientY / gl.domElement.clientHeight) * 2 + 1
    );

    const screenDragVector = {
      start: clickInfo.current.screenPosition,
      end: endScreenPosition
    };

    const dragDistance = new THREE.Vector2()
      .subVectors(endScreenPosition, clickInfo.current.screenPosition)
      .length();

    if (dragDistance > 0.05) {
      const move = determineRotation(
        clickInfo.current.position,
        clickInfo.current.normal,
        screenDragVector,
        camera
      );

      console.log(`Move: ${move}`);

      if (onRotationStart && move) {
        const rotationParams = convertMoveToRotationParams(move);
        if (rotationParams) {
          const { groupIndices, axis, angle } = rotationParams;
          onRotationStart(groupIndices, axis, angle);
        }
      }
    }

    setDragStart(null);
    clickInfo.current = null;
  };

  // Determine the rotation based on geometry
  const determineRotation = (
    clickPosition: THREE.Vector3,
    faceNormal: THREE.Vector3,
    screenDragVector: { start: THREE.Vector2, end: THREE.Vector2 },
    camera: THREE.Camera
  ): string => {
    // Step 1: Create a projection plane based on the clicked face
    const projectionPlane = new THREE.Plane(faceNormal, -clickPosition.dot(faceNormal));

    // Step 2: Project the screen drag vector onto the 3D face plane
    const dragStartWorld = unprojectScreenPoint(screenDragVector.start, camera, projectionPlane);
    const dragEndWorld = unprojectScreenPoint(screenDragVector.end, camera, projectionPlane);

    // Handle failed projections
    if (!dragStartWorld || !dragEndWorld) return "";

    // Calculate the 3D drag vector on the face plane
    const dragVector3D = new THREE.Vector3().subVectors(dragEndWorld, dragStartWorld);

    // Step 3: Calculate the rotation axis using cross product
    // The cross product of the face normal and drag vector gives us the rotation axis
    const rotationAxis = new THREE.Vector3().crossVectors(faceNormal, dragVector3D).normalize();

    // Step 4: Determine which principal axis the rotation axis is most aligned with
    const absX = Math.abs(rotationAxis.x);
    const absY = Math.abs(rotationAxis.y);
    const absZ = Math.abs(rotationAxis.z);

    let principalAxis: string;
    let direction: number;
    console.log(absX, absY, absZ);
    if (absX > absY && absX > absZ) {
      principalAxis = 'x';
      direction = Math.sign(rotationAxis.x);
    } else if (absY > absX && absY > absZ) {
      principalAxis = 'y';
      direction = Math.sign(rotationAxis.y);
    } else {
      principalAxis = 'z';
      direction = Math.sign(rotationAxis.z);
    }
    console.log(direction);
    // Step 5: Determine which layer to rotate based on the click position
    const layerIndex = determineLayerFromPosition(clickPosition, principalAxis);

    // Step 6: Map to standard Rubik's cube notation
    return mapToNotation(principalAxis, layerIndex, direction);
  };

  // Helper function to determine which layer the click position belongs to
  const determineLayerFromPosition = (position: THREE.Vector3, axis: string): number => {
    // Get the component value for the specified axis
    const value = position[axis as keyof THREE.Vector3] as number;

    // Determine layer (0, 1, or 2) based on position
    // Assuming the cube is roughly centered at origin with dimensions of approx ±1.5
    if (value < -0.3) return 0;      // First layer
    else if (value > 0.3) return 2;  // Last layer
    else return 1;                   // Middle layer
  };

  // Map the geometric determination to standard Rubik's cube notation
  const mapToNotation = (axis: string, layer: number, direction: number): string => {
    // Conversion table from axis, layer and direction to notation
    const notationMap: Record<string, Record<number, Record<string, string>>> = {
      'x': {
        0: { '1': 'L', '-1': "L'" },    // Left face
        1: { '1': 'M', '-1': "M'" },    // Middle slice
        2: { '1': "R'", '-1': 'R' }     // Right face (note: inverted direction)
      },
      'y': {
        0: { '1': 'D', '-1': "'D'" },    // Down face
        1: { '1': 'E', '-1': "E'" },    // Equator slice
        2: { '1': "U'", '-1': 'U' }     // Up face
      },
      'z': {
        0: { '1': "B'", '-1': 'B' },    // Back face
        1: { '1': "S'", '-1': 'S' },    // Standing slice
        2: { '1': "F'", '-1': 'F' }     // Front face
      }
    };

    try {
      return notationMap[axis][layer][direction.toString()];
    } catch (e) {
      return "";
    }
  };

  const unprojectScreenPoint = (
    screenPoint: THREE.Vector2,
    camera: THREE.Camera,
    plane: THREE.Plane
  ): THREE.Vector3 | null => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(screenPoint, camera);

    const intersection = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      return intersection;
    }
    return null;
  };

  const convertMoveToRotationParams = (move: string) => {

    const isClockwise = !move.includes("'");
    const baseFace = move.charAt(0);

    switch (baseFace) {

      default:
        return null;
    }
  };

  return (
    <>
      <group ref={groupRef} dispose={null}>
        <mesh geometry={(nodes.Center as THREE.Mesh).geometry} material={materials.Black} />
        {cubies?.map((cubie, index) => (
          cubie.name != "Center" && (
            <group
              key={index}
              rotation={new THREE.Euler().setFromQuaternion(cubie.rotation)}
            >
              {nodes[`${cubie.name}`] &&
                <mesh
                  geometry={(nodes[`${cubie.name}_1`] as THREE.Mesh).geometry}
                  material={materials.Black}
                  onPointerDown={handleCubiePointerDown(index, cubie.name)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                />
              }
              {
                nodes[`${cubie.name}`] &&
                cubie.name.split('_').map((color: string, color_index: number) => (
                  <mesh
                    key={color_index}
                    geometry={(nodes[`${cubie.name}_${color_index + 2}`] as THREE.Mesh).geometry}
                    material={materials[color]}
                    onPointerDown={handleCubiePointerDown(index, cubie.name)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                ))
              }
            </group>
          )
        ))}
      </group>
    </>
  );
}

useGLTF.preload('/models/RubiksCube3x3.glb')
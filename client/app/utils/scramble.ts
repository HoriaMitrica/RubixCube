import * as THREE from 'three';
import { Cubie } from '@/models/cubie';
import { 
  TOP_LAYER_INDEXES, BOTTOM_LAYER_INDEXES, 
  FRONT_LAYER_INDEXES, BACK_LAYER_INDEXES, 
  LEFT_LAYER_INDEXES, RIGHT_LAYER_INDEXES,
  X_CLOCKWISE_ROTATION, X_COUNTERCLOCKWISE_ROTATION,
  Y_CLOCKWISE_ROTATION, Y_COUNTERCLOCKWISE_ROTATION,
  Z_CLOCKWISE_ROTATION, Z_COUNTERCLOCKWISE_ROTATION,
  ROTATION_ANGLE
} from '@/constants/constants';

const MOVES = [
  { indices: TOP_LAYER_INDEXES, axis: Y_CLOCKWISE_ROTATION, name: "U" },
  { indices: TOP_LAYER_INDEXES, axis: Y_COUNTERCLOCKWISE_ROTATION, name: "U'" },
  { indices: BOTTOM_LAYER_INDEXES, axis: Y_COUNTERCLOCKWISE_ROTATION, name: "D" },
  { indices: BOTTOM_LAYER_INDEXES, axis: Y_CLOCKWISE_ROTATION, name: "D'" },
  { indices: FRONT_LAYER_INDEXES, axis: Z_CLOCKWISE_ROTATION, name: "F" },
  { indices: FRONT_LAYER_INDEXES, axis: Z_COUNTERCLOCKWISE_ROTATION, name: "F'" },
  { indices: BACK_LAYER_INDEXES, axis: Z_COUNTERCLOCKWISE_ROTATION, name: "B" },
  { indices: BACK_LAYER_INDEXES, axis: Z_CLOCKWISE_ROTATION, name: "B'" },
  { indices: LEFT_LAYER_INDEXES, axis: X_COUNTERCLOCKWISE_ROTATION, name: "L" },
  { indices: LEFT_LAYER_INDEXES, axis: X_CLOCKWISE_ROTATION, name: "L'" },
  { indices: RIGHT_LAYER_INDEXES, axis: X_CLOCKWISE_ROTATION, name: "R" },
  { indices: RIGHT_LAYER_INDEXES, axis: X_COUNTERCLOCKWISE_ROTATION, name: "R'" }
];

export const scrambleCube = async (
  initialCubies: Cubie[],
  rotateFunction: (
    cubies: Cubie[],
    groupIndices: number[],
    axis: THREE.Vector3,
    angle: number,
    duration: number,
    setCubies: (cubies: Cubie[]) => void,
    setIsAnimating?: (isAnimating: boolean) => void
  ) => void,
  setCubies: (cubies: Cubie[]) => void,
  setIsAnimating: (isAnimating: boolean) => void,
  numMoves: number,
  moveDelay: number 
) => {
  setIsAnimating(true);
  
  const scrambleSequence = generateScrambleSequence(numMoves);
  console.log("Scramble sequence:", scrambleSequence.map(move => move.name).join(" "));
  
  let currentCubies = initialCubies.map(cubie => ({
    ...cubie,
    rotation: cubie.rotation.clone()
  }));
  
  for (let i = 0; i < scrambleSequence.length; i++) {
    const move = scrambleSequence[i];
    console.log(`Executing move ${i+1}/${scrambleSequence.length}: ${move.name}`);
    
    currentCubies = await executeMove(
      currentCubies,
      move.indices,
      move.axis,
      rotateFunction,
      setCubies,
      setIsAnimating,
      i === scrambleSequence.length - 1,
      moveDelay
    );
  }
  
  console.log("Scramble complete!");
};

const generateScrambleSequence = (numMoves: number) => {
  const sequence = [];
  let lastFaceIndex = -1;
  
  for (let i = 0; i < numMoves; i++) {
    let moveIndex;
    let faceIndex;
    
    do {
      moveIndex = Math.floor(Math.random() * MOVES.length);
      faceIndex = Math.floor(moveIndex / 2);
    } while (faceIndex === lastFaceIndex);
    
    sequence.push(MOVES[moveIndex]);
    lastFaceIndex = faceIndex;
  }
  
  return sequence;
};

const executeMove = (
  currentCubies: Cubie[],
  groupIndices: number[],
  axis: THREE.Vector3,
  rotateFunction: any,
  setCubies: (cubies: Cubie[]) => void,
  setIsAnimating: (isAnimating: boolean) => void,
  isLastMove: boolean,
  moveDelay: number
): Promise<Cubie[]> => {
  return new Promise(resolve => {
    let updatedCubies: Cubie[] = currentCubies;
    
    rotateFunction(
      currentCubies,
      groupIndices,
      axis,
      ROTATION_ANGLE,
      moveDelay,
      (newCubies: Cubie[]) => {
        updatedCubies = newCubies.map(cubie => ({
          ...cubie,
          rotation: cubie.rotation.clone()
        }));
        
        setCubies(updatedCubies);
      },
      (isAnimating: boolean) => {
        if (!isAnimating) {
          if (isLastMove) {
            setIsAnimating(false);
          } else {
            setIsAnimating(true); 
          }
          
          setTimeout(() => {
            resolve(updatedCubies);
          }, moveDelay);
        } else {
          setIsAnimating(true);
        }
      }
    );
  });
};
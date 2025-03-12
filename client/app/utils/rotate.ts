import * as THREE from 'three';
import { Cubie } from '@/models/cubie';
import { CENTER_INDEXES } from '@/constants/constants';

export const rotateGroup = (
  cubies: Cubie[], 
  groupIndices: number[], 
  axis: THREE.Vector3, 
  angle: number,
  duration: number,
  setCubies: (cubies: Cubie[]) => void,
  setIsAnimating?: (isAnimating: boolean) => void
) => {
  console.log(axis,cubies);
  
  const currentCubies = cubies.map(cubie => ({
    ...cubie,
    rotation: cubie.rotation.clone()
  }));
  
  const cubiesToRotate: Cubie[] = [];
  const initialRotations: THREE.Quaternion[] = [];
  

  
  groupIndices.forEach(index => {
    const cubie = currentCubies.find(c => c.currentIndex === index);
    if (cubie) {
      cubiesToRotate.push(cubie);
      initialRotations.push(cubie.rotation.clone());
    }
  });
  
  if (setIsAnimating) {
    setIsAnimating(true);
  }
  
  cubiesToRotate.forEach((cubie, index) => {
    if (CENTER_INDEXES.includes(cubie.currentIndex)) {
      return;
    }
    
    if (axis.x < 0 || axis.y < 0 || axis.z < 0) {
      const nonCenterIndices = groupIndices.filter(idx => !CENTER_INDEXES.includes(idx));
      const currentPosition = nonCenterIndices.indexOf(cubie.currentIndex);
      if (currentPosition !== -1) {
        const newPosition = (currentPosition + 2) % nonCenterIndices.length;
        cubie.currentIndex = nonCenterIndices[newPosition];
      }
    } else if (axis.x > 0 || axis.y > 0 || axis.z > 0) {
      const nonCenterIndices = groupIndices.filter(idx => !CENTER_INDEXES.includes(idx));
      const currentPosition = nonCenterIndices.indexOf(cubie.currentIndex);
      if (currentPosition !== -1) {
        let newPosition = currentPosition - 2;
        if (newPosition < 0) {
          newPosition = nonCenterIndices.length + newPosition;
        }
        cubie.currentIndex = nonCenterIndices[newPosition];
      }
    }
  });
  
  setCubies([...currentCubies]);
  
  const startTime = performance.now();
  
  const animate = () => {
    const now = performance.now();
    const elapsed = now - startTime;
    let progress = Math.min(elapsed / duration, 1);
    
    const newCubies = currentCubies.map(cubie => ({
      ...cubie,
      rotation: cubie.rotation.clone()
    }));
    
    cubiesToRotate.forEach((cubie, i) => {
      const cubieToAnimate = newCubies.find(c => c.currentIndex === cubie.currentIndex);
      if (!cubieToAnimate) return;
      
      const initialRotation = initialRotations[i];
      
      const currentRotation = new THREE.Quaternion().copy(initialRotation);
      const stepQuaternion = new THREE.Quaternion().setFromAxisAngle(
        axis, 
        angle * progress
      );
      
      currentRotation.multiplyQuaternions(stepQuaternion, initialRotation);
      
      cubieToAnimate.rotation = currentRotation;
    });
    
    setCubies([...newCubies]);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      console.log("Animation complete");
      
      const finalCubies = currentCubies.map(cubie => ({
        ...cubie,
        rotation: cubie.rotation.clone()
      }));
      
      cubiesToRotate.forEach((cubie, i) => {
        const finalCubie = finalCubies.find(c => c.currentIndex === cubie.currentIndex);
        if (!finalCubie) return;
        
        const initialRotation = initialRotations[i];
        
        const finalRotation = new THREE.Quaternion().copy(initialRotation);
        const finalQuaternion = new THREE.Quaternion().setFromAxisAngle(
          axis, 
          angle
        );
        
        finalRotation.multiplyQuaternions(finalQuaternion, initialRotation);
        finalCubie.rotation = finalRotation;
      });
      
      setCubies([...finalCubies]);
  console.log(finalCubies)
      
      if (setIsAnimating) {
        setIsAnimating(false);
      }
    }
  };
  setTimeout(() => {

    requestAnimationFrame(animate);
  }, 50);
};
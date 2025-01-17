import { useRef, useEffect } from 'react';
import { Text, Center } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

function HeroText() {
  const textRef = useRef<THREE.Group>(null!);
  const welcomeTextRef = useRef<any>(null);
  const tensorTextRef = useRef<any>(null);
  const { camera } = useThree();
  const scrollY = useRef(0);
  const initialCameraZ = 5;

  useEffect(() => {
    camera.position.z = initialCameraZ;
    
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  useFrame((state) => {
    if (!textRef.current) return;

    // Calculate scroll progress
    const scrollProgress = Math.min(scrollY.current / window.innerHeight, 1);
    const targetZ = initialCameraZ - (scrollProgress * 15);
    
    // Animate camera zoom
    gsap.to(camera.position, {
      z: targetZ,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Glitch effect parameters
    const time = state.clock.elapsedTime;
    const glitchIntensity = Math.sin(time * 2) * 0.05;

    // Glitch effect for welcome text
    if (welcomeTextRef.current) {
      welcomeTextRef.current.position.x = Math.sin(time * 3) * glitchIntensity;
      welcomeTextRef.current.position.y = 0.5 + Math.cos(time * 4) * glitchIntensity;
      welcomeTextRef.current.rotation.z = Math.sin(time * 5) * glitchIntensity * 0.5;
    }

    // Glitch effect for tensor text
    if (tensorTextRef.current) {
      tensorTextRef.current.position.x = -2 + Math.cos(time * 3) * glitchIntensity;
      tensorTextRef.current.position.y = -0.8 + Math.sin(time * 4) * glitchIntensity;
      tensorTextRef.current.rotation.z = Math.cos(time * 5) * glitchIntensity * 0.5;
    }

    // Fade out and move text
    const opacity = 1 - Math.max(0, scrollProgress * 2);
    const yPosition = -scrollProgress * 2;

    gsap.to(textRef.current.position, {
      y: yPosition,
      duration: 0.5,
    });

    // Apply opacity to text
    textRef.current.children.forEach((child: any) => {
      if (child.material) {
        child.material.opacity = opacity;
        child.material.needsUpdate = true;
      }
    });
  });

  return (
    <Center>
      <group ref={textRef}>
        <Text
          ref={welcomeTextRef}
          fontSize={0.8}
          position={[0, 0.5, 0]}
          characters="WELCOME TO"
        >
          <meshPhysicalMaterial
            color="#00ffff"
            emissive="#0066ff"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={1}
            reflectivity={0.6}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </Text>
        <Text
          ref={tensorTextRef}
          fontSize={1.2}
          position={[-2, -0.8, 0]}
          characters="TENSOR CLUB"
        >
          <meshPhysicalMaterial
            color="#00ffff"
            emissive="#0066ff"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={1}
            reflectivity={0.6}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </Text>
      </group>
    </Center>
  );
}

export default HeroText;
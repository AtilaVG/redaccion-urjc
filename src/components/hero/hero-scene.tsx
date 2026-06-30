"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, AdaptiveDpr, Preload } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { orbVertexShader, orbFragmentShader } from "./shaders";

function EnergyOrb() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const hover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.42 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color("#4c1d95") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorC: { value: new THREE.Color("#e11d48") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const target = state.pointer.length() > 0.05 ? 1 : 0;
      hover.current = THREE.MathUtils.lerp(hover.current, target, delta * 2);
      matRef.current.uniforms.uHover.value = hover.current;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.35}>
      <icosahedronGeometry args={[1.1, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Starfield({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#a5b4fc"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Shards() {
  const items = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        pos: [
          Math.cos((i / 7) * Math.PI * 2) * 3.2,
          (Math.random() - 0.5) * 3,
          Math.sin((i / 7) * Math.PI * 2) * 3.2,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.18,
        speed: 0.5 + Math.random(),
        color: ["#22d3ee", "#8b5cf6", "#e11d48"][i % 3],
      })),
    [],
  );

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={it.speed}
          rotationIntensity={1.4}
          floatIntensity={1.6}
        >
          <mesh position={it.pos} scale={it.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={it.color}
              emissive={it.color}
              emissiveIntensity={1.4}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    target.current.set(state.pointer.x * 1.6, state.pointer.y * 1.1, 5.2);
    camera.position.lerp(target.current, delta * 1.4);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#04050a"]} />
      <fog attach="fog" args={["#04050a", 8, 20]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#8b5cf6" />
      <pointLight position={[0, 4, -4]} intensity={20} color="#e11d48" />

      <EnergyOrb />
      <Shards />
      <Starfield />
      <Environment preset="night" />

      <CameraRig />
      <AdaptiveDpr pixelated />
      <Preload all />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0006, 0.0009]}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}

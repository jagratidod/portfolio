import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function Scene() {
  const group = useRef<Group>(null)
  const orbit = useRef<Group>(null)

  useFrame((state, dt) => {
    const g = group.current
    if (g) {
      g.rotation.y += dt * 0.25
      g.rotation.x += dt * 0.1
      // ease toward the pointer for a parallax feel
      g.position.x += (state.pointer.x * 0.6 - g.position.x) * 0.05
      g.position.y += (state.pointer.y * 0.4 - g.position.y) * 0.05
    }
    if (orbit.current) orbit.current.rotation.z += dt * 0.5
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#6b88ff" />

      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial color="#2748f0" flatShading roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh scale={1.22}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#0a0e1a" wireframe />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.3, 0.04, 16, 100]} />
          <meshStandardMaterial color="#f6f0e4" />
        </mesh>
      </group>

      <group ref={orbit}>
        <mesh position={[2.9, 0, 0]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#f6f0e4" />
        </mesh>
        <mesh position={[-2.6, 0.8, 0]}>
          <octahedronGeometry args={[0.28]} />
          <meshStandardMaterial color="#0a0e1a" flatShading />
        </mesh>
      </group>
    </>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
      <Scene />
    </Canvas>
  )
}

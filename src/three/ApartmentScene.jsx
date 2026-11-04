import { Component, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'

const DEFAULT_MODEL_PATH = '/models/apartment.glb'

// The longest side of the model is scaled to this many scene units, so the
// camera/orbit values below work no matter what units the GLB was exported in.
const TARGET_SIZE = 8

// Cap pixel ratio at 2 to keep high-DPI phones/laptops fast.
const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)

function Model({ path }) {
  const { scene } = useGLTF(path)

  // Measure the model once, then derive a uniform scale and a centering offset.
  // scale  = TARGET_SIZE / longest side  (e.g. a 20-unit-wide model -> scale 0.4)
  // offset = -center of the bounding box (moves the model's center to the origin)
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return {
      scale: TARGET_SIZE / maxDim,
      offset: center.negate().toArray(),
    }
  }, [scene])

  return (
    <group scale={scale}>
      <group position={offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <span className="whitespace-nowrap rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-700 shadow">
        Loading 3D tour…
      </span>
    </Html>
  )
}

class SceneErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-neutral-600">
          Couldn’t load the 3D model. Please try again later.
        </div>
      )
    }
    return this.props.children
  }
}

export default function ApartmentScene({ modelPath = DEFAULT_MODEL_PATH }) {
  return (
    <SceneErrorBoundary>
      <Canvas
        dpr={DPR}
        camera={{ position: [7, 5, 9], fov: 50, near: 0.1, far: 100 }}
        className="h-full w-full"
      >
        <color attach="background" args={['#f5f5f5']} />

        {/* Soft fill + one directional light; the Environment adds realistic reflections */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />

        <Suspense fallback={<Loader />}>
          <Model path={modelPath} />
          {/* "apartment" is a built-in drei preset; swap for "city" if you prefer */}
          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={3} // closest zoom (model is ~8 units wide)
          maxDistance={20} // farthest zoom
          maxPolarAngle={Math.PI / 2} // don't orbit below the floor
        />
      </Canvas>
    </SceneErrorBoundary>
  )
}
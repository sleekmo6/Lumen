import { Component, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'

const DEFAULT_MODEL_PATH = '/models/apartment.glb'

// The longest side of the model is scaled to this many scene units, so the
// camera/orbit values below work no matter what units the GLB was exported in.
const TARGET_SIZE = 8

// Cap pixel ratio at 2 to keep high-DPI phones/laptops fast.
const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)

function Model({ path, onReady }) {
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

  // This only runs once the model (and environment) have finished loading
  useEffect(() => {
    onReady()
  }, [onReady])

  return (
    <group scale={scale}>
      <group position={offset}>
        <primitive object={scene} />
      </group>
    </group>
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-lumen-deep px-6 text-center text-white">
          <p className="text-lg font-light">This 3D tour isn’t available right now.</p>
          <p className="text-sm font-light text-white/60">
            The model couldn’t be loaded. Please try again later.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function ApartmentScene({ modelPath = DEFAULT_MODEL_PATH }) {
  const [ready, setReady] = useState(false)
  const markReady = useCallback(() => setReady(true), [])

  return (
    <SceneErrorBoundary>
      <div className="relative h-full w-full bg-lumen-deep">
        <Canvas
          dpr={DPR}
          camera={{ position: [7, 5, 9], fov: 50, near: 0.1, far: 100 }}
          className="h-full w-full"
        >
          <color attach="background" args={['#1d2325']} />

          {/* Soft fill + one directional light; the Environment adds realistic reflections */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} />

          <Suspense fallback={null}>
            <Model path={modelPath} onReady={markReady} />
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

        {/* Dark skeleton + message while the model loads; fades away when ready */}
        <div
          aria-hidden={ready}
          className={[
            'absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-lumen-deep text-white transition-opacity duration-700',
            ready ? 'pointer-events-none opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <div className="grid w-64 grid-cols-3 gap-2" aria-hidden="true">
            <div className="col-span-3 h-24 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-12 animate-pulse rounded-xl bg-white/10" />
            <div className="h-12 animate-pulse rounded-xl bg-white/[0.07]" />
            <div className="h-12 animate-pulse rounded-xl bg-white/10" />
          </div>
          <p role="status" className="text-sm font-light tracking-wide text-white/70">
            Loading the space…
          </p>
        </div>
      </div>
    </SceneErrorBoundary>
  )
}
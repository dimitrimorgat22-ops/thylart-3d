"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

export default function ModelViewer({ src, className }: { src: string; className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.7
    mount.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.01, 100)
    camera.position.set(0, 0, 5)

    // HDR studio neutre avec bon contraste pour les métaux
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    new RGBELoader().load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr",
      (hdr) => {
        const envMap = pmrem.fromEquirectangular(hdr).texture
        scene.environment = envMap
        hdr.dispose()
        pmrem.dispose()
      }
    )

    // Lumières d'appoint
    const key = new THREE.DirectionalLight(0xffffff, 0.6)
    key.position.set(3, 5, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.15)
    fill.position.set(-3, 2, 2)
    scene.add(fill)

    // Mouse parallax
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 0.6
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener("mousemove", onMouseMove)

    let modelRef: THREE.Group | null = null

    // Load model
    const loader = new GLTFLoader()
    loader.load(src, (gltf) => {
      const model = gltf.scene

      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.8 / maxDim
      model.scale.setScalar(scale)
      model.position.sub(center.multiplyScalar(scale))

      modelRef = gltf.scene

      modelRef.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              // Corriger les espaces colorimétriques que le GLTFLoader peut mal détecter
              if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace
              if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace
              if (mat.normalMap) mat.normalMap.colorSpace = THREE.LinearSRGBColorSpace

              // envMapIntensity adaptatif : métal poli = reflets forts,
              // métal brossé/plastique = reflets doux — évite que la base color disparaisse
              const roughness = mat.roughness ?? 0.5
              const metalness = mat.metalness ?? 0
              mat.envMapIntensity = metalness > 0.5
                ? 1.2 + (1 - roughness) * 2.0   // métal : 1.2 → 3.2
                : 1.5                             // non-métal : fixe

              mat.needsUpdate = true
            }
          })
        }
      })

      // Légère inclinaison initiale
      modelRef.rotation.z = -0.15
      modelRef.rotation.x = 0.08
      scene.add(modelRef)
    })

    // Animate
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      // Smooth lerp vers la souris
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      if (modelRef) {
        modelRef.rotation.y = currentX
        modelRef.rotation.x = 0.08 + currentY
      }
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      const w2 = mount.clientWidth
      const h2 = mount.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [src])

  return <div ref={mountRef} className={className} style={{ cursor: "grab" }} />
}

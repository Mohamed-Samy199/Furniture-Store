// import React, { useRef, useMemo } from 'react'
// import { useLoader, useFrame } from '@react-three/fiber'
// import { TextureLoader, Color, CatmullRomCurve3, Vector3, TubeGeometry } from 'three'
// import { OrbitControls } from '@react-three/drei'

// function latLonToVector3(lat, lon, radius = 1) {
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)
//   const x = -radius * Math.sin(phi) * Math.cos(theta)
//   const z = radius * Math.sin(phi) * Math.sin(theta)
//   const y = radius * Math.cos(phi)
//   return new Vector3(x, y, z)
// }

// function Arc({ start, end, color = '#C5A363', height = 0.6, radius = 1, segments = 64 }) {
//   const startV = latLonToVector3(start[0], start[1], radius)
//   const endV = latLonToVector3(end[0], end[1], radius)
//   const mid = startV.clone().lerp(endV, 0.5)
//   mid.normalize().multiplyScalar(radius + height)
//   const curve = new CatmullRomCurve3([startV, mid, endV])
//   const tubeGeom = useMemo(() => new TubeGeometry(curve, segments, 0.006, 8, false), [curve, segments])
//   return (
//     <mesh geometry={tubeGeom}>
//       <meshBasicMaterial attach="material" color={color} toneMapped={false} />
//     </mesh>
//   )
// }

// export default function StripeGlobe({
//   worldMap = '/assets/globe_texture.png',
//   dotColor = '#C5A363',
//   altColor = '#EDEDED'
// }) {
//   const tex = useLoader(TextureLoader, worldMap)
//   const matRef = useRef()

//   useFrame(({ clock }) => {
//     if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.08
//   })

//   const uniforms = useMemo(() => ({
//     uMap: { value: tex },
//     uDotColor: { value: new Color(dotColor) },
//     uAltColor: { value: new Color(altColor) },
//     uTime: { value: 0 },
//     uScale: { value: 210.0 }
//   }), [tex, dotColor, altColor])

//   const vertexShader = `
//     varying vec2 vUv;
//     varying vec3 vNormal;
//     void main(){
//       vUv = uv;
//       vNormal = normal;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//     }
//   `
//   const fragmentShader = `
//     uniform sampler2D uMap;
//     uniform vec3 uDotColor;
//     uniform vec3 uAltColor;
//     uniform float uTime;
//     uniform float uScale;
//     varying vec2 vUv;
//     varying vec3 vNormal;

//     float circle(vec2 uv, float r){
//       return 1.0 - smoothstep(r, r + 0.01, length(uv - 0.5));
//     }

//     void main(){
//       vec3 m = texture2D(uMap, vUv).rgb;
//       float lum = dot(m, vec3(0.299,0.587,0.114));
//       vec2 gv = fract(vUv * uScale);
//       float c = circle(gv, 0.22);
//       float land = step(0.2, lum);
//       float dots = c * land;
//       float light = dot(normalize(vNormal), normalize(vec3(0.3,0.6,0.8))) * 0.5 + 0.5;
//       vec3 seaColor = vec3(0.02, 0.06, 0.12);
//       vec3 dotCol = uDotColor;
//       vec3 alt = uAltColor;
//       vec3 col = mix(seaColor, dotCol, dots);
//       col = mix(col, alt * 0.08, land * (1.0 - dots));
//       float rim = pow(1.0 - length(vUv - 0.5) * 1.8, 2.0);
//       col *= 0.9 + 0.2 * rim * light;
//       gl_FragColor = vec4(col, 1.0);
//     }
//   `

//   const arcs = [
//     { from: [37.7749, -122.4194], to: [51.5074, -0.1278], color: '#E6B15A' },
//     { from: [10.0, -75.0], to: [55.0, -3.0], color: '#9B66E6' },
//     { from: [-30.0, 20.0], to: [45.0, -80.0], color: '#67CBEF' },
//   ]

//   return (
//     <group>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1.0} />
//       <mesh rotation={[0, 0, 0]}>
//         <sphereBufferGeometry args={[1, 256, 256]} />
//         <shaderMaterial
//           ref={matRef}
//           uniforms={uniforms}
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//         />
//       </mesh>

//       <mesh scale={[1.02, 1.02, 1.02]}>
//         <sphereBufferGeometry args={[1, 64, 64]} />
//         <meshStandardMaterial color={'#050b11'} opacity={0.18} transparent={true} roughness={1} metalness={0} />
//       </mesh>

//       {arcs.map((a, i) => (
//         <Arc key={i} start={a.from} end={a.to} color={a.color} height={0.5} radius={1} />
//       ))}

//       {/* rotation animation */}
//       <AutoRotate />
//       <OrbitControls maxPolarAngle={Math.PI / 2.2} minDistance={1.4} maxDistance={3.5} />
//     </group>
//   )
// }

// // small helper component for autorotation
// function AutoRotate() {
//   const ref = useRef()
//   useFrame((state) => {
//     if (ref.current) ref.current.rotation.y += 0.0008
//   })
//   return <group ref={ref} />
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useRef, useMemo } from 'react'
// import { useLoader, useFrame } from '@react-three/fiber'
// import { TextureLoader, Color, CatmullRomCurve3, Vector3, TubeGeometry } from 'three'
// import { OrbitControls } from '@react-three/drei'

// function latLonToVector3(lat, lon, radius = 1) {
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)
//   const x = -radius * Math.sin(phi) * Math.cos(theta)
//   const z = radius * Math.sin(phi) * Math.sin(theta)
//   const y = radius * Math.cos(phi)
//   return new Vector3(x, y, z)
// }

// function Arc({ start, end, color = '#C5A363', height = 0.6, radius = 1, segments = 64 }) {
//   const startV = latLonToVector3(start[0], start[1], radius)
//   const endV = latLonToVector3(end[0], end[1], radius)
//   const mid = startV.clone().lerp(endV, 0.5)
//   mid.normalize().multiplyScalar(radius + height)
//   const curve = new CatmullRomCurve3([startV, mid, endV])
//   const tubeGeom = useMemo(() => new TubeGeometry(curve, segments, 0.006, 8, false), [curve, segments])
//   return (
//     <mesh geometry={tubeGeom}>
//       <meshBasicMaterial attach="material" color={color} toneMapped={false} />
//     </mesh>
//   )
// }

// export default function StripeGlobe({
//   worldMap = '/assets/world-map-gold.jpg',
//   dotColor = '#C5A363',
//   altColor = '#EDEDED'
// }) {
//   const tex = useLoader(TextureLoader, worldMap)
//   const matRef = useRef()

//   useFrame(({ clock }) => {
//     if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.08
//   })

//   const uniforms = useMemo(() => ({
//     uMap: { value: tex },
//     uDotColor: { value: new Color(dotColor) },
//     uAltColor: { value: new Color(altColor) },
//     uTime: { value: 0 },
//     uScale: { value: 400.0 } // زودنا الكثافة
//   }), [tex, dotColor, altColor])

//   const vertexShader = `
//     varying vec2 vUv;
//     varying vec3 vNormal;
//     void main(){
//       vUv = uv;
//       vNormal = normal;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//     }
//   `

//   const fragmentShader = `
//     uniform sampler2D uMap;
//     uniform vec3 uDotColor;
//     uniform vec3 uAltColor;
//     uniform float uTime;
//     uniform float uScale;
//     varying vec2 vUv;
//     varying vec3 vNormal;

//     float random(vec2 st) {
//       return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
//     }

//     void main(){
//       vec3 mapColor = texture2D(uMap, vUv).rgb;
//       float lum = dot(mapColor, vec3(0.299, 0.587, 0.114)); // السطوع
//       float threshold = 0.45; // الحد اللي نعتبر بعده إن فيه قارة

//       vec2 grid = fract(vUv * uScale);
//       float rnd = random(floor(vUv * uScale));
//       float mask = step(threshold, lum);
//       float dotShape = step(0.9, rnd); // للتحكم في الكثافة

//       vec3 seaColor = vec3(0.02, 0.06, 0.12);
//       vec3 color = mix(seaColor, uDotColor, mask * dotShape);

//       float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
//       color += rim * 0.15;

//       gl_FragColor = vec4(color, 1.0);
//     }
//   `

//   const arcs = [
//     { from: [37.7749, -122.4194], to: [51.5074, -0.1278], color: '#E6B15A' },
//     { from: [10.0, -75.0], to: [55.0, -3.0], color: '#9B66E6' },
//     { from: [-30.0, 20.0], to: [45.0, -80.0], color: '#67CBEF' },
//   ]

//   return (
//     <group>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1.0} />

//       <mesh rotation={[0, 0, 0]}>
//         <sphereBufferGeometry args={[1, 256, 256]} />
//         <shaderMaterial
//           ref={matRef}
//           uniforms={uniforms}
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//         />
//       </mesh>

//       {/* الطبقة الخارجية اللامعة الخفيفة */}
//       <mesh scale={[1.02, 1.02, 1.02]}>
//         <sphereBufferGeometry args={[1, 64, 64]} />
//         <meshStandardMaterial color={'#050b11'} opacity={0.18} transparent roughness={1} metalness={0} />
//       </mesh>

//       {/* الخطوط بين المدن */}
//       {arcs.map((a, i) => (
//         <Arc key={i} start={a.from} end={a.to} color={a.color} height={0.5} radius={1} />
//       ))}

//       <AutoRotate />
//       <OrbitControls maxPolarAngle={Math.PI / 2.2} minDistance={1.4} maxDistance={3.5} />
//     </group>
//   )
// }

// function AutoRotate() {
//   const ref = useRef()
//   useFrame(() => {
//     if (ref.current) ref.current.rotation.y += 0.0008
//   })
//   return <group ref={ref} />
// }
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ

// import React, { useMemo, useRef } from 'react'
// import * as THREE from 'three'
// import { useFrame, useLoader } from '@react-three/fiber'
// import { TextureLoader, Vector3, CatmullRomCurve3, TubeGeometry } from 'three'
// import { OrbitControls } from '@react-three/drei'

// function latLonToVector3(lat, lon, radius = 1) {
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)
//   const x = -radius * Math.sin(phi) * Math.cos(theta)
//   const z = radius * Math.sin(phi) * Math.sin(theta)
//   const y = radius * Math.cos(phi)
//   return new Vector3(x, y, z)
// }

// function Arc({ start, end, color = '#C5A363', height = 0.4, radius = 1 }) {
//   const startV = latLonToVector3(start[0], start[1], radius)
//   const endV = latLonToVector3(end[0], end[1], radius)
//   const mid = startV.clone().lerp(endV, 0.5).normalize().multiplyScalar(radius + height)
//   const curve = new CatmullRomCurve3([startV, mid, endV])
//   const geom = useMemo(() => new TubeGeometry(curve, 64, 0.006, 8, false), [curve])
//   return (
//     <mesh geometry={geom}>
//       <meshBasicMaterial color={color} />
//     </mesh>
//   )
// }

// export default function StripeGlobe({ maskMap }) {
//   const groupRef = useRef()
//   const mask = useLoader(TextureLoader, maskMap)

//   // توليد النقاط الخاصة بالقارات
//   const particles = useMemo(() => {
//     const geo = new THREE.BufferGeometry()
//     const vertices = []
//     const colors = []

//     const width = mask.image.width
//     const height = mask.image.height
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
//     canvas.width = width
//     canvas.height = height
//     ctx.drawImage(mask.image, 0, 0)
//     const data = ctx.getImageData(0, 0, width, height).data

//     for (let y = 0; y < height; y += 3) {
//       for (let x = 0; x < width; x += 3) {
//         const i = (y * width + x) * 4
//         const brightness = data[i] / 255
//         if (brightness > 0.4) {
//           const lat = 90 - (y / height) * 180
//           const lon = (x / width) * 360 - 180
//           const pos = latLonToVector3(lat, lon, 1.001)
//           vertices.push(pos.x, pos.y, pos.z)
//           // اللون الذهبي المطلوب (#C5A363)
//           const color = new THREE.Color('#C5A363')
//           colors.push(color.r, color.g, color.b)
//         }
//       }
//     }

//     geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
//     geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
//     return geo
//   }, [mask])

//   // دوران الكرة الأرضية
//   useFrame(({ clock }) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
//     }
//   })

//   const arcs = [
//     { from: [37.77, -122.41], to: [51.50, -0.12], color: '#E6B15A' },
//     { from: [10, -75], to: [55, -3], color: '#9B66E6' },
//     { from: [-30, 20], to: [45, -80], color: '#67CBEF' },
//   ]

//   return (
//     <group ref={groupRef}>
//       {/* الإضاءة */}
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[3, 2, 1]} intensity={1.1} color={'#fff4d6'} />
//       <pointLight position={[-3, -2, -1]} intensity={0.5} color={'#ffd27f'} />

//       {/* البحر الأسود */}
//       <mesh>
//         <sphereGeometry args={[1, 128, 128]} />
//         <meshStandardMaterial color={'#000000'} roughness={0.95} metalness={0.3} />
//       </mesh>

//       {/* القارات (الذهبية #C5A363) */}
//       <points geometry={particles}>
//         <pointsMaterial
//           size={0.012}
//           vertexColors
//           emissive={'#C5A363'}
//           emissiveIntensity={0.4}
//           roughness={0.4}
//           metalness={1.0}
//         />
//       </points>

//       {/* الأقواس */}
//       {arcs.map((a, i) => (
//         <Arc key={i} start={a.from} end={a.to} color={a.color} />
//       ))}

//       <OrbitControls minDistance={1.4} maxDistance={3.5} />
//     </group>
//   )
// }



import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3, CatmullRomCurve3, TubeGeometry } from 'three'
import { OrbitControls } from '@react-three/drei'

function latLonToVector3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new Vector3(x, y, z)
}

function Arc({ start, end, color = '#C5A363', height = 0.4, radius = 1, pulseSpeed = 2 }) {
  const startV = latLonToVector3(start[0], start[1], radius)
  const endV = latLonToVector3(end[0], end[1], radius)
  const mid = startV.clone().lerp(endV, 0.5).normalize().multiplyScalar(radius + height)
  const curve = new CatmullRomCurve3([startV, mid, endV])
  const geom = useMemo(() => new TubeGeometry(curve, 64, 0.006, 8, false), [curve])
  const matRef = useRef()

  // حركة النبض (Pulse effect)
  useFrame(({ clock }) => {
    if (matRef.current) {
      const pulse = (Math.sin(clock.elapsedTime * pulseSpeed) + 1) / 2 // من 0 إلى 1
      matRef.current.color.lerpColors(
        new THREE.Color(color),
        new THREE.Color('white'),
        pulse * 0.5
      )
      matRef.current.needsUpdate = true
    }
  })

  return (
    <mesh geometry={geom}>
      <meshBasicMaterial ref={matRef} color={color} />
    </mesh>
  )
}

export default function StripeGlobe({ maskMap }) {
  const groupRef = useRef()
  const mask = useLoader(TextureLoader, maskMap)

  // توليد النقاط الخاصة بالقارات
  const particles = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = []
    const colors = []

    const width = mask.image.width
    const height = mask.image.height
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.drawImage(mask.image, 0, 0)
    const data = ctx.getImageData(0, 0, width, height).data

    for (let y = 0; y < height; y += 3) {
      for (let x = 0; x < width; x += 3) {
        const i = (y * width + x) * 4
        const brightness = data[i] / 255
        if (brightness > 0.4) {
          const lat = 90 - (y / height) * 180
          const lon = (x / width) * 360 - 180
          const pos = latLonToVector3(lat, lon, 1.001)
          vertices.push(pos.x, pos.y, pos.z)
          const color = new THREE.Color('#C5A363')
          colors.push(color.r, color.g, color.b)
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [mask])

  // دوران الكرة الأرضية
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  // الأشرطة الجديدة (6 ألوان)
  const arcs = [
    { from: [30, -100], to: [45, 10], color: '#864721' }, // بني
    { from: [-20, 60], to: [50, 140], color: '#415E6F' }, // رمادي أزرق
    { from: [10, -75], to: [-30, 120], color: '#217D82' }, // أزرق غامق
    { from: [0, -30], to: [50, 90], color: '#2D8A4E' }, // أخضر
    { from: [40, -10], to: [-25, 150], color: '#E04F4F' }, // أحمر
    { from: [-35, -70], to: [60, 60], color: '#6F2DA8' }, // بنفسجي
  ]


  return (
    <group ref={groupRef}>
      {/* الإضاءة */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 2, 1]} intensity={1.1} color={'#fff4d6'} />
      <pointLight position={[-3, -2, -1]} intensity={0.5} color={'#ffd27f'} />

      {/* البحر الأسود */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial color={'#000000'} roughness={0.95} metalness={0.3} />
      </mesh>

      {/* القارات */}
      <points geometry={particles}>
        <pointsMaterial
          size={0.012}
          vertexColors
          emissive={'#C5A363'}
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={1.0}
        />
      </points>

      {/* الأقواس مع النبض */}
      {arcs.map((a, i) => (
        <Arc key={i} start={a.from} end={a.to} color={a.color} pulseSpeed={2 + Math.random()} />
      ))}

      <OrbitControls minDistance={1.4} maxDistance={3.5} />
    </group>
  )
}




// import React, { useRef, useMemo } from 'react'
// import { useLoader, useFrame } from '@react-three/fiber'
// import * as THREE from 'three'
// import { TextureLoader, Color, CatmullRomCurve3, Vector3, TubeGeometry } from 'three'
// import { OrbitControls } from '@react-three/drei'

// function latLonToVector3(lat, lon, radius = 1) {
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)
//   const x = -radius * Math.sin(phi) * Math.cos(theta)
//   const z = radius * Math.sin(phi) * Math.sin(theta)
//   const y = radius * Math.cos(phi)
//   return new Vector3(x, y, z)
// }

// function Arc({ start, end, color = '#C5A363', height = 0.6, radius = 1, segments = 64 }) {
//   const startV = latLonToVector3(start[0], start[1], radius)
//   const endV = latLonToVector3(end[0], end[1], radius)
//   const mid = startV.clone().lerp(endV, 0.5)
//   mid.normalize().multiplyScalar(radius + height)
//   const curve = new CatmullRomCurve3([startV, mid, endV])
//   const tubeGeom = useMemo(() => new TubeGeometry(curve, segments, 0.006, 8, false), [curve, segments])
//   return (
//     <mesh geometry={tubeGeom}>
//       <meshBasicMaterial attach="material" color={color} toneMapped={false} />
//     </mesh>
//   )
// }

// export default function StripeGlobe({
//   maskMap = '/assets/world_mask.png',
//   dotColor = '#C5A363',
//   altColor = '#EDEDED'
// }) {
//   const mask = useLoader(TextureLoader, maskMap)
//   const matRef = useRef()

//   useFrame(({ clock }) => {
//     if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.06
//   })

//   const uniforms = useMemo(() => ({
//     uMask: { value: mask },
//     uDotColor: { value: new Color(dotColor) },
//     uAltColor: { value: new Color(altColor) },
//     uTime: { value: 0 },
//     uScale: { value: 480.0 }
//   }), [mask, dotColor, altColor])

//   const vertexShader = `
//     varying vec2 vUv;
//     varying vec3 vNormal;
//     void main(){
//       vUv = uv;
//       vNormal = normal;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//     }
//   `

//   const fragmentShader = `
//     uniform sampler2D uMask;
//     uniform vec3 uDotColor;
//     uniform vec3 uAltColor;
//     uniform float uTime;
//     uniform float uScale;
//     varying vec2 vUv;
//     varying vec3 vNormal;

//     float random(vec2 st) {
//       return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
//     }

//     float circle(vec2 uv, float r){
//       return 1.0 - smoothstep(r, r + 0.01, length(uv - 0.5));
//     }

//     void main(){
//       float maskVal = texture2D(uMask, vUv).r;
//       vec2 grid = fract(vUv * uScale);
//       vec2 cell = floor(vUv * uScale) / uScale;
//       float rnd = random(cell);
//       float density = smoothstep(0.5, 1.0, maskVal);
//       float pick = step(0.88, rnd) * density;
//       float c = circle(grid, 0.22);
//       float dots = c * pick;
//       vec3 seaColor = vec3(0.02, 0.06, 0.12);
//       vec3 dotCol = uDotColor;
//       vec3 alt = uAltColor;
//       vec3 col = mix(seaColor, dotCol, dots);
//       col = mix(col, alt * 0.08, density * (1.0 - dots));
//       float light = dot(normalize(vNormal), normalize(vec3(0.3,0.6,0.8))) * 0.5 + 0.5;
//       float rim = pow(1.0 - length(vUv - 0.5) * 1.8, 2.0);
//       col *= 0.9 + 0.25 * rim * light;
//       gl_FragColor = vec4(col, 1.0);
//     }
//   `

//   const arcs = [
//     { from: [37.7749, -122.4194], to: [51.5074, -0.1278], color: '#E6B15A' },
//     { from: [10.0, -75.0], to: [55.0, -3.0], color: '#9B66E6' },
//     { from: [-30.0, 20.0], to: [45.0, -80.0], color: '#67CBEF' },
//   ]

//   return (
//     <group>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1.0} />

//       <mesh rotation={[0, 0, 0]}>
//         <sphereBufferGeometry args={[1, 256, 256]} />
//         <shaderMaterial
//           ref={matRef}
//           uniforms={uniforms}
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//         />
//       </mesh>

//       <mesh scale={[1.02, 1.02, 1.02]}>
//         <sphereBufferGeometry args={[1, 64, 64]} />
//         <meshStandardMaterial color={'#050b11'} opacity={0.18} transparent roughness={1} metalness={0} />
//       </mesh>

//       {arcs.map((a, i) => (
//         <Arc key={i} start={a.from} end={a.to} color={a.color} height={0.5} radius={1} />
//       ))}

//       <AutoRotate />
//       <OrbitControls maxPolarAngle={Math.PI / 2.2} minDistance={1.4} maxDistance={3.5} />
//     </group>
//   )
// }

// function AutoRotate() {
//   const ref = useRef()
//   useFrame(() => {
//     if (ref.current) ref.current.rotation.y += 0.0009
//   })
//   return <group ref={ref} />
// }

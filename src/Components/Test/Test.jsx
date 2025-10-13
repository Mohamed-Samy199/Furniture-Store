import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

import Incubator from '../Incubator/Incubator'


const Test = () => {
    return (
        <>
        <div className='container'>
        <header className='text-center d-flex align-items-center justify-content-center flex-column position-relative headers mb-4'>
        <h2>Services</h2>
        <span className='position-relative my-3'></span>
        </header>
        
            </div>
            <Canvas className='service' style={{height: "80vh"}}>
            <Stage environment="city" intensity={0.6}>
            
            <Incubator />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
        </>
    )
}

export default Test

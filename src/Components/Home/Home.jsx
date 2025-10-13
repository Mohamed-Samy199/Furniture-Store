import React from 'react'
import { Link } from 'react-router-dom'
import Chat from '../Chat/Chat'
import ModelView from '../ModelView'
import GlobeScene from './GlobeModel'
    // import ModelView from '.'




export default function Home() {
  return <>
  <section id='home' className='d-flex justify-content-center align-items-center position-relative'>

    <Chat/>

    <div className="layout d-flex justify-content-center align-items-center">
    <div className="text-home">
      <h1 className='text-main h1-main fw-bolder'>Furniture</h1>
      <Link to="/details"><button className='btn btn-outline-main fw-bolder mt-5 mx-5 px-4 py-2'>Show More</button></Link>
    </div>
    </div>



    
    </section>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ padding: 40, color: '#fff' }}>
        {/* النص على الشمال */}
      </div>
      <div style={{ position: 'relative' }}>
        <ModelView>
          <GlobeScene />
        </ModelView>
      </div>
    </div>
  
  </>
  
  
}

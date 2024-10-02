import React from 'react'
import './Registrar_Content.css'
import Registrar_ContentHeader from './Registrar_ContentHeader'
import Registrar_Card from './Registrar_Card'
import Registrar_Announcements from './Registrar_Announcements'


const Registrar_Content = () => {
  return (
    <div className='Registrar-d_content'>
      <Registrar_ContentHeader />
      <Registrar_Card />
      <Registrar_Announcements />
    </div>
  )
}

export default Registrar_Content
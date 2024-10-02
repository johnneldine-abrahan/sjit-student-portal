import React, {useEffect} from 'react'
import './Registrar_layout.css'
import Registrar_Students_Sidebar from '../components/Registrar/Students/Registrar_Students-Sidebar/Registrar_Students-Sidebar.jsx'
import Registrar_Students_Content from '../components/Registrar/Students/Registrar_Students-Content/Registrar_Students-Content.jsx'

const Registrar_Students = () => {
  useEffect(() => {
    document.title = "Registrar - Students";
  }, []);


  return (
    <div className='registrar-body'>
      <div className='registrar-display'>
        <Registrar_Students_Sidebar />
        <div className='registrar-main-content'>
            <Registrar_Students_Content />
        </div>
      </div>
    </div>
  )
}

export default Registrar_Students
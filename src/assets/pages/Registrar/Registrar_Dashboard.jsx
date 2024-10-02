import React, {useEffect} from 'react'
import './Registrar_layout.css'
import Registrar_Content from '../components/Registrar/Dashboard/Registrar_Content/Registrar_Content'
import Registrar_Profile from '../components/Registrar/Dashboard/Registrar_Profile/Registrar_Profile'
import Registrar_Sidebar from '../components/Registrar/Dashboard/Registrar_Sidebar/Registrar_Sidebar'

const Registrar_Dashboard = () => {
  useEffect(() => {
    document.title = "Registrar - Dashboard";
  }, []);


  return (
    <div className='registrar-body'>
        <div className='registrar-display'>
            <Registrar_Sidebar />
            <div className='registrar-main-content'>
                <Registrar_Content />
                <Registrar_Profile />
            </div>

        </div>
    </div>
  )
}

export default Registrar_Dashboard
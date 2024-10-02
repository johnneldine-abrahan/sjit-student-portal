import React, { useEffect } from 'react'
import './Registrar_layout.css'
import Archive_Content from '../components/Registrar/Archive/Archive_Content/Archive_Content'
import Archive_Sidebar from '../components/Registrar/Archive/Archive_Sidebar/Archive_Sidebar'

const Registrar_Archive = () => {
  useEffect(() => {
    document.title = "Finance - Dashboard";
  }, []);

  return (
    <div className='registrar-body'>
        <div className='registrar-display'>
        <Archive_Sidebar />
            <div className='registrar-main-content'>
                <Archive_Content />

            </div>

        </div>
    </div>
  )
}

export default Registrar_Archive
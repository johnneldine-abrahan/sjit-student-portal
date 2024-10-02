import React, {useEffect} from 'react'
import './Registrar_layout.css'
import Enroll_Students_Sidebar from '../components/Registrar/Enroll_Students/Enroll_Students-Sidebar/Enroll_Students_Sidebar'
import Enroll_Students_Content from '../components/Registrar/Enroll_Students/Enroll_Students-Content/Enroll_Students_Content'

const Registrar_Enroll_Students = () => {
  useEffect(() => {
    document.title = "Registrar - Enroll Students";
  }, []);

  return (
    <div className='registrar-body'>
        <div className='registrar-display'>
            <Enroll_Students_Sidebar />
            <div className='registrar-main-content'>
                <Enroll_Students_Content />
            </div>
        </div>

    </div>
  )
}

export default Registrar_Enroll_Students
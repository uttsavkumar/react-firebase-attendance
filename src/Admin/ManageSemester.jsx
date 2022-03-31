import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const ManageSemester = () => {
    const nav = useNavigate()
    useEffect(() => {
        var userData = localStorage.getItem('userData')

        if(userData){
            nav('/admin/manageSemester')
        }
        if(!userData){
            nav('login')
        }
    },[])
  return (
    <>

    <Navbar/>
        <div className="conatiner">
            <div className="row">

            </div>
        </div>
    </>
    
  )
}

export default ManageSemester
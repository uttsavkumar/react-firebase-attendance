import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const nav = useNavigate()
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className="navbar-brand">Attendance Managment</Link>

                <ul className="navbar-nav">
                <li>
                        <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <Link to='/manageStudent' className='nav-link'>Manage Student</Link>
                    </li>
                    <li>
                        <Link to='/prevAttendance' className='nav-link'>Previous Attendance</Link>
                    </li>
                    <li>
                        <button className="btn btn-dark btn-transparent" onClick={ () =>{ 
                            localStorage.removeItem('userData')
                            nav('/login')
                        } }>Logout</button>
                    </li>
                   
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar
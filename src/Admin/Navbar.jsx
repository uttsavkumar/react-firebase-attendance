import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const nav = useNavigate()
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className="navbar-brand">Attendance Managment|Admin</Link>

                <ul className="navbar-nav">
                <li>
                        <Link to='/admin' className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <Link to='/admin/manageCourse' className='nav-link'>Manage Course</Link>
                    </li>
                    <li>
                        <Link to='/admin/manageTeacher' className='nav-link'>Manage Teacher</Link>
                    </li>
                    {/* <li>
                        <Link to='/admin/manageSemester' className='nav-link'>Manage Semester</Link>
                    </li> */}
                    <li>
                        <button className="btn btn-dark btn-transparent" onClick={ () =>{ 
                            localStorage.removeItem('admin')
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
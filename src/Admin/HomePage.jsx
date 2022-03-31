import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const HomePage = () => {
    const nav = useNavigate()
    useEffect(() => {
        var userData = localStorage.getItem('admin')

        if(userData){
            nav('/admin')
        }
        if(!userData){
            nav('/login')
        }
    },[])
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="row mt-5">
        <div className="col-3 ">
          <div className="card bg-primary">
            <div className="card-body text-white">
                <h4>300+</h4>
                <h2>Courses</h2>
            </div>
          </div>
        </div>
        <div className="col-3 ">
          <div className="card bg-primary">
            <div className="card-body text-white">
                <h4>300+</h4>
                <h2>Teachers</h2>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card bg-primary">
            <div className="card-body text-white">
                <h4>300+</h4>
                <h2>Courses</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage
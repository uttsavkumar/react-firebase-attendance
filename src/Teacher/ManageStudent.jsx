import { equalTo, onValue, orderByChild, query, ref, remove } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import Navbar from './Navbar'

const ManageStudent = () => {
  const[data,setData] = useState([])
  const nav  = useNavigate('')
     useEffect( () => {
       const user = localStorage.getItem('userData')
        if(user){
            nav('/manageStudent')
        }
        else{
            nav('/login')
        }
     },[])
     useEffect(() => {
      const dref = ref(db, 'student')
      const quer = query(dref, orderByChild('teacherCode'), equalTo(localStorage.getItem('userData')))
      onValue(quer, (snaphot) => {
          let value = []
          snaphot.forEach((childSnaphot) => {
              var course = childSnaphot.val()
              course['key'] = childSnaphot.key
              value = [...value, course]
          })
          setData(value)
      })
  },[])
  const handleDelete = (id) => {
    const del = remove(ref(db,`student/${id}`))
  }
  return (
    <div>
        <Navbar/>
        <div className="container">
          <div className="row">
            <div className="col-7 mt-4">
              <h4>Student's Info</h4>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Roll</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 {data.map((d,key) => (
                    <tr key={key}>
                    <td>{d.studentRoll}</td>
                    <td>{d.studentName}</td>
                    <td>{d.studentCourse}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => handleDelete(d.key)}>X</button>
                    </td>
                  </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ManageStudent
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Navbar from './Navbar'
//Not finished
const PrevAttendance = () => {

  const[data,setData] = useState([])
  const manageData = () => {
    const date = new Date()
    const day = date.toLocaleDateString('en-us',{weekday:'long'})
    const month = date.toLocaleDateString('en-us',{month:'long'})
    const curDate = date.getDate()
    const year = date.getFullYear()
    const todayDate = curDate + " " + month + " " + year
    return todayDate
   
}
  useEffect(() => {
    const dref = ref(db, 'student')
    onValue(dref, (snaphot) => {
        let value = []
        snaphot.forEach((childSnaphot) => {
            var course = childSnaphot.val()
            course['key'] = childSnaphot.key
            value = [...value, course]
        })
        setData(value)
    })
},[])
  return (
    <div>
        <Navbar/>
        <div className="container">
          <div className="row">
            <div className="col-8 mt-3">
            <h3>Current Date: {manageData()}</h3>
              <table className="table mt-3">
                <thead>
                    <tr>
                      <th>Roll</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((d,key) => (
                    <tr key={key}>
                      <th>{key}</th>
                    <th>{d.studentName}</th>
                    <th>{d.studentCourse}</th>
                    <th>{d.status}</th>
                    <th>{d.date}</th>
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

export default PrevAttendance
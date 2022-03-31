import { equalTo, onValue, orderByChild, query, ref, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

const Table = () => {
    const[std,setStd] = useState([])
    const[stat,setStat] = useState(false)
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
        //add second query
        // const quer = query(dref, orderByChild('teacherCode'), equalTo(localStorage.getItem('userData')))
         const quer = query(dref, orderByChild('date'), equalTo(manageData()))
         
        onValue(quer, (snaphot) => {
            let value = []
            snaphot.forEach((childSnaphot) => {
                var course = childSnaphot.val()
                course['key'] = childSnaphot.key
                value = [...value, course]
            })
            setStd(value)
        })
    },[])
    const handlePresent = (id) => {
        const data = update(ref(db,`student/${id}`),{status:"present"}).then(() => {

        })
    }
    const handleAbscent = (id) => {
        const data = update(ref(db,`student/${id}`),{status:"abscent"}).then(() => {

        })
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <h3 className='mt-4'>Attendance on Date: {manageData()} </h3>
                    <div className="col-11">
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th scope='col'>Roll</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Course</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {std.map((data,key) => (
                                    <tr key={key}>
                                    <th >{data.studentRoll}</th>
                                    <td>{data.studentName}</td>
                                    <td >{data.studentCourse}</td>
                                    <td >
                                        <button className={(data.status === "abscent"  ) ? "btn btn-success invisible":"btn btn-success ms-5 "} onClick={() => handlePresent(data.key)}>P</button>

                                        <button className={(data.status === "present" )  ? "btn btn-danger invisible":"btn btn-danger ms-2"} onClick={() => handleAbscent(data.key)} >A</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table
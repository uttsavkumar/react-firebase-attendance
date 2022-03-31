import { onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import Navbar from './Navbar'

const ManageCourse = () => {
    const [course, setCourse] = useState('')
    const [coursedata, setCoursedata] = useState([])

    const nav = useNavigate()
    useEffect(() => {
        const dref = ref(db, 'courses')
        onValue(dref, (snaphot) => {
            var value = []
            snaphot.forEach((childSnaphot) => {
                let course = childSnaphot.val()
                course['key'] = childSnaphot.key
                value = [...value, course]
            })
            setCoursedata(value)
        })
    },[])
    useEffect(() => {
        var userData = localStorage.getItem('admin')

        if (userData) {
            nav('/admin/manageCourse')
            
        }
        if (!userData) {
            nav('/login')
        }
    }, [])
    

    const handleClick = () => {
        const dataref = push(ref(db, 'courses'))
        set(dataref, {
            course: course
        })
    }
   const handleDelete = (id) => {
    const del = remove(ref(db,`courses/${id}`))
   }
   
    return (
        <>

            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="col-6 mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="">Course Name</label>
                                        <div className="input-group mt-3">
                                            <input type="text" className='form-control'  onChange={e => setCourse(e.target.value)} />
                                            <button className="btn btn-success" onClick={handleClick}>Insert Course</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-3">
                    <div className="col-9">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Course Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {coursedata.map((data, key) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{data.course}</td>
                                        <td>
                                            <button type='button' className='ms-3 btn btn-danger' onClick={() => handleDelete(data.key)}>Delete</button>

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

export default ManageCourse
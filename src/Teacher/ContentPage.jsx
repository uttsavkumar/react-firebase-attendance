import { onValue, push, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import Navbar from './Navbar'
import Table from './Table'

const ContentPAge = () => {
  
    const [alert, setAlert] = useState(false)
    const[name,setName] = useState('')    
    const[roll,setRoll] = useState('')    
    const[course,setCourse] = useState('')    
    const[coursedata,setCoursedata] = useState([])    

    const manageData = () => {
        const date = new Date()
        const day = date.toLocaleDateString('en-us',{weekday:'long'})
        const month = date.toLocaleDateString('en-us',{month:'long'})
        const curDate = date.getDate()
        const year = date.getFullYear()
        const todayDate = curDate + " " + month + " " + year
        return todayDate
       
    }
    const[date,setDate] = useState(manageData)
    const reset = () => {
        setName('')
        setCourse('')
        setRoll('')
    }
    const handleClick = (e) => {
        e.preventDefault()
        const location = push(ref(db, 'student'))
        set(location, {
            studentName:name,
            studentCourse: course,
            studentRoll:roll,
            date:date,
            status: "",
            teacherCode: localStorage.getItem('userData'),
        }).then(() => {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 2000)
        })
        reset()
    }
    const nav = useNavigate()
    useEffect(() => {
        var userData = localStorage.getItem('userData')

        if (userData) {
            nav('/')
        }
        if (!userData) {
            nav('/login')
        }
    }, [])
    useEffect(() => {
        const dref = ref(db, 'courses')
        onValue(dref, (snaphot) => {
            let value = []
            snaphot.forEach((childSnaphot) => {
                var course = childSnaphot.val()
                course['key'] = childSnaphot.key
                value = [...value, course]
            })
            setCoursedata(value)
        })
    },[])
   
     

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className='p-3'> Add new Student </h4>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input type="Student Name" value={name} name="studentName" onChange={e => setName(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                                <label htmlFor="floatingInput">Student Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-floating">
                                            <input type="Student Roll" value={roll} className="form-control" name="studentRoll" onChange={e => setRoll(e.target.value)} id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Student Roll</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="mb-3">
                                            <select className="form-select" value={course} aria-label="Default select example" name="studentCourse" onChange={e => setCourse(e.target.value)}>
                                                <option value="" selected disabled>Select course</option>
                                               {coursedata.map((data,key) => (
                                                    <option key={key} value={data.course}>{data.course}</option>
                                               
                                               ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary w-100" onClick={handleClick}>Add Student</button>
                                        {alert && <div className="alert alert-success mt-2" >Student Data Inserted</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Table  />

        </>
    )
}

export default ContentPAge
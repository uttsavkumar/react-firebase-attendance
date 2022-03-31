import { createUserWithEmailAndPassword } from 'firebase/auth'
import { push, ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'

const Register = () => {
    const initialValue = {
        email:'',
        password:'',
        name:'',
        teachingClass:'',
        contact:'',
        status:1,
    } 
   
    const[data,setData] = useState(initialValue)
    const handelChange = (e) => {
        const {name,value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const nav = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
      
            const loc = push(ref(db,'teachers'))
            const tdata = set(loc,{
                email:data.email,
                password:data.password,
                status:data.status,
            }).then(() => { 
                createUserWithEmailAndPassword(auth,data.email,data.password)
            })
           
    }
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                           
                            <div className="mb-3">
                                <label htmlFor="">Email</label>
                                <input type="email" name='email' className="form-control" value={data.email} onChange={handelChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">password</label>
                                <input type="password" name='password' className="form-control" value={data.password}  onChange={handelChange}/>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary w-100" onClick={handleClick}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register
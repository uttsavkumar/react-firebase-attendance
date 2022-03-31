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
        contact:'',
        status:0,
        verified:0
    } 
   
    const[data,setData] = useState(initialValue)
    const[alert,setAlert] = useState(false)
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
                name:data.name,
                email:data.email,
                password:data.password,
                contact:data.contact,   
                status:data.status,
                verified:data.verified
            }).then(() => {
                nav('/login')
                setAlert(true)
                setTimeout(() =>{
                setAlert(false)
               },2000)
                console.log('inserted')
            })
           
    }
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto mt-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="">Name</label>
                                <input type="text" name='name' className="form-control" value={data.name}  onChange={handelChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">contact</label>
                                <input type="text" name='contact' className="form-control" value={data.contact}  onChange={handelChange}/>
                            </div>
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
                                {alert && <div className="alert alert-success mt-2">Applied!</div>}
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
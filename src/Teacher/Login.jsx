import { async } from '@firebase/util'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { auth, db } from '../firebase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)


    const nav = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        const refdata = ref(db, 'teachers')
        const quer = query(refdata, orderByChild('email'), equalTo(email))
        onValue(quer,async (snapshot) => {
            let status;
            let verified;
            snapshot.forEach((childSnapshot) => {
                status = childSnapshot.val().status;
                verified = childSnapshot.val().verified;

            })
            if (verified !== 1) {
                console.log('not verified')
        
            }
            if (status === 0) {
                const reg = await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user.uid
                        localStorage.setItem('userData', user)
                        console.log(user)
                        nav('/')
                    }).catch((error) => {
                        setAlert(true)
                        setTimeout(() => {
                            setAlert(false)
                        }, 1500)
                        console.log('error')
                    });
            }

            if (status === 1) {
                const newreg = await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const admin = userCredential.user
                        localStorage.setItem('admin', admin)
                        nav('/admin')
                    }).catch((error) => {
                        setAlert(true)
                        setTimeout(() => {
                            setAlert(false)
                        }, 1500)
                        console.log("error")
                    });
                }
           
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
                                    <label htmlFor="">Email</label>
                                    <input type="email" name='email' className="form-control" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">password</label>
                                    <input type="password" name='password' className="form-control" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-primary w-100" onClick={handleClick}>Login</button>
                                    {alert && <div className="alert alert-danger mt-2">Invalid email or Password!</div>}

                                </div>
                                <div className="mb-3 ">
                                   <Link to='/register' className='btn btn-link float-end' >Register?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
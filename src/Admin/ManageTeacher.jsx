import { createUserWithEmailAndPassword } from 'firebase/auth'
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Navbar from './Navbar'


const ManageTeacher = () => {
    const [btn, setBtn] = useState(true)
    const [teacher, setTeacher] = useState([])
    useEffect(() => {
        let data = ref(db, 'teachers')
        const quer = query(data,orderByChild('status'),equalTo(0))
        onValue(quer, (snapshot) => {
            let teacher = []
            snapshot.forEach((childSnapshot) => {
                var value = childSnapshot.val()
                value['key'] = childSnapshot.key
                teacher = [...teacher, value]
            })
            setTeacher(teacher)
        })
    }, [])

    const handleReject = (id) => {
        const deleteref = remove(ref(db,`teachers/${id}`))
    }

    const handleApproved = (id) => {
        console.log(id)
        const dbref = ref(db, `teachers/${id}`)
        onValue(dbref, (snapshot) => {
            var value = snapshot.val()
            if (value.status === 0 && value.verified === 0) {
                console.log('teacher')
                const res = createUserWithEmailAndPassword(auth, value.email, value.password).then((userCredential) => {
                    const user = userCredential.user
                    console.log(user)
                })
                const dataupdate = ref(db, `teachers/${id}`)
                update(dataupdate, { verified: 1 })
            }
            else {
                console.log('principal')
            }
        })
    }
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-10">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacher.map((data, key) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{data.name}</td>
                                        <td>{data.contact}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <button onClick={() => handleApproved(data.key)} className={data.verified === 0 ? ' btn btn-warning' : 'btn btn-success disabled'}>{data.verified === 0 ? 'Pending' : 'Approved'}</button>
                                            <button type='button' className='ms-3 btn btn-danger' onClick={() => handleReject(data.key)}>Delete</button>

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

export default ManageTeacher



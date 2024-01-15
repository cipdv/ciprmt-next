'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function RegistrationPage() {

    const router = useRouter()
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session]);

        const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'patient'
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                result.email ? router.push('/login') : console.log(result);
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-3 glassmorphism'>
        <div className='name-fields'>
            <div className='name-field'>
                <label>First name</label>
                <input type='text' value={data.firstName} onChange={(e)=>{setData({...data, firstName: e.target.value})}}/>
            </div>

            <div className='name-field'>
                <label>Last name</label>
                <input type='text' value={data.lastName} onChange={(e)=>{setData({...data, lastName: e.target.value})}}/>
            </div>
        </div>
            <label>Email</label>
            <input type='email' value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}}/>
            <label>Phone Number</label>
            <input type='tel' value={data.phoneNumber} onChange={(e)=>{setData({...data, phoneNumber: e.target.value})}}/>
            <label>Password</label>
            <input type='password' value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}}/>
            <label>Confirm Password</label>
            <input type='password' value={data.confirmPassword} onChange={(e)=>{setData({...data, confirmPassword: e.target.value})}}/>
            <button type='submit' className='btn_register'>Submit</button>
    </form>
    );
}

export default RegistrationPage;


// 'use client'

// import RegistrationForm from "@components/RegistrationForm"
// import { useState, useEffect } from "react"
// import { redirect, useRouter } from 'next/navigation'
// import { getServerSession } from "next-auth"

// const RegistrationPage = async () => {

//     const router = useRouter()
    
//     // if(session) redirect('/dashboard')

//     const [submitting, setsubmitting] = useState(false)
//     const [data, setData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     })

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const response = await fetch('/api/register', {
//             method: 'POST',
//             header: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//             })
//         const result = await response.json()
//         console.log(result)
//         // if(result === 200) {
//         //     router.push('/login')
//         // }
//     }

//     return (
//         <section className='w-full max-w-full flex-center flex-col'>
//             <RegistrationForm
//                 handleSubmit={handleSubmit}
//                 submitting={submitting}
//                 data={data}
//                 setData={setData}
//             />
//         </section>
//     )
// }

// export default RegistrationPage
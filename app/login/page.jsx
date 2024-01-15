'use client'

import LoginForm from "@components/LoginForm"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session]);
    
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = (e) => {
        e.preventDefault();
        setSubmitting(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((res) => {
                setSubmitting(false);
                if (res.error) {
                    console.log(res.error);
                } else {
                    router.push('/dashboard');
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.error('Error:', error);
            });
    };

    return (
        <section className='w-full max-w-full flex-center flex-col'>
            <LoginForm
                handleSubmit={loginUser}
                submitting={submitting}
                data={data}
                setData={setData}
            />
        </section>
    );
};

export default LoginPage;
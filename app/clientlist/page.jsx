'use client'

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // if (status === 'authenticated') {
        //     const getClients = async () => {
        //         const response = await fetch('/api/clientlist');
        //         const result = await response.json();
        //         setClients(result);
        //     };
        //     getClients();
        // } else if (status === 'unauthenticated') {
        //     router.push('/login');
        // }
        const getClients = async () => {
            const response = await fetch('/api/clientlist');
            const result = await response.json();
            setClients(result);
        };
        getClients();
    }, [status]);

    if (status === 'loading') {
        return null; // or a loading spinner, etc.
    }

    return (
        <div>
            <p>
                {clients && clients.map(client => (
                    <div key={client.id}>
                        <p>{client.email}, </p>
                    </div>
                ))}
            </p>
        </div>
    );
};

export default Page;

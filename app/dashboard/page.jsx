'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UpcomingAppointments from '@components/UpcomingAppointments';

const DashboardPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [treatments, setTreatments] = useState([]);
    
    useEffect(() => {

        if (status === 'authenticated') {
            const id = session?.user?.id;
            fetch(`/api/treatments/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setTreatments(data);
                    } else {
                        console.error('Error: expected array but received', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching treatments', error);
                });
        } else {
            router.push('/login');
        }
    }, [status, session]);

    // is there a way that I can render the health history form component only if the user has not filled it out yet or it is not up to date? then show the entire form on the health history page?
    return (
        <div>
            <h3 className='text-xl font-bold'>Hi {session?.user?.firstName},</h3>
            <UpcomingAppointments treatments={treatments} />
        </div>
    );
};

export default DashboardPage
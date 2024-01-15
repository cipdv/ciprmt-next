'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session]);

    return (
        <section className="w-full flex-center">
                <Image
                        src='/assets/images/cip-profile-pic.jpg'
                        width={200}
                        height={200}
                        className="object-contain rounded-full w-1/3"
                        alt="Cip de Vries"
                />
                <div className="pl-7 w-2/3">
                        <h2 className="intro_text text-center">Hi I'm Cip,</h2>
                        <h2 className="intro_text text-center pt-1">I'm a Massage Therapist</h2>
                
                        <p className="desc text-center pt-5">I'm very passionate about health and well-being. I love taking care of my body with exercise, healthy foods, and spending time with those I care about. My favourite activities include volleyball, rock climbing, swimming, skating, and just being outdoors with nature.</p>
                        <p className="desc text-center">As your Massage Therapist, I promise to give you 100% of my attention while focusing on your needs to give you the best treatment possible. Your health and well-being are just as important to me as my own.</p>

                        <div className="flex-center mt-10">
                                <Link href='/register'>
                                        <button className="btn_register">Register for a Massage</button>
                                </Link>    
                        </div>
                </div>
        </section>
    )
}

export default Home

// import Image from "next/image"
// import Link from "next/link"

// const Home = () => {
//   return (
//     <section className="w-full flex-center">
//         <Image
//             src='/assets/images/cip-profile-pic.jpg'
//             width={200}
//             height={200}
//             className="object-contain rounded-full w-1/3"
//             alt="Cip de Vries"

//         />
//         <div className="pl-7 w-2/3">
//             <h2 className="intro_text text-center">Hi I'm Cip,</h2>
//             <h2 className="intro_text text-center pt-1">I'm a Massage Therapist</h2>
        
//             <p className="desc text-center pt-5">I'm very passionate about health and well-being. I love taking care of my body with exercise, healthy foods, and spending time with those I care about. My favourite activities include volleyball, rock climbing, swimming, skating, and just being outdoors with nature.</p>
//             <p className="desc text-center">As your Massage Therapist, I promise to give you 100% of my attention while focusing on your needs to give you the best treatment possible. Your health and well-being are just as important to me as my own.</p>

//             <div className="flex-center mt-10">
//                 <Link href='/register'>
//                     <button className="btn_register">Register for a Massage</button>
//                 </Link>    
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Home
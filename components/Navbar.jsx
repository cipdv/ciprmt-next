'use client'

import Link from "next/link"
import Image from 'next/image'
import { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession();
    const [toggleDropdown, settoggleDropdown] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                settoggleDropdown(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <div className="flex gap-2 flex-center">
                <Link href="/">
                    <Image 
                        src='/assets/icons/massage-icon.png'
                        width={40}
                        height={40}
                        className="object-contain"
                        alt='Cip de Vries, RMT'
                    />
                    <p className="logo_text">
                        Cip de Vries, RMT
                    </p>
                </Link>
                
            </div>
            <div className='sm:flex hidden'>
                {session ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/receipts" className="mr-4">
                            Receipts
                        </Link>
                        <Link href="/health-history" className="mr-4">
                            Health History
                        </Link>
                        <button className="black_btn" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
                    </div>
                    ) : (
                    <button className="black_btn" onClick={() => signIn()}>Sign In</button>
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <i className="fas fa-bars" onClick={()=> {settoggleDropdown((prev) => !prev)}}></i>
                        {toggleDropdown && (
                            <div className='dropdown' ref={dropdownRef}>
                                <Link href="/dashboard" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                    Dashboard
                                </Link>
                                <Link href="/receipts" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                    Receipts
                                </Link>
                                <Link href="/health-history" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                    Health History
                                </Link>
                                <button className='mt-5 w-full black_btn' type='button' onClick={() => {
                                    settoggleDropdown(false) 
                                    signOut()} 
                                }
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
            ) : (
                <>
                    <button className="black_btn" onClick={() => signIn()}>Sign In</button>
                </>
            )}
        </div>
        </nav>
    );
};

export default Navbar;

// 'use client'

// import Link from "next/link"
// import Image from 'next/image'
// import { useState, useEffect } from "react"
// import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

// const Navbar = () => {

//     const isUserLoggedIn = true
//     const [providers, setProviders] = useState(null)
//     const [toggleDropdown, settoggleDropdown] = useState(false)

//     useEffect(()=>{
//         const setProvidersState = async () => {
//             const response = await getProviders()

//             setProviders(response)
//         }

//         setProvidersState()
//     }, [])

//     return (
//         <nav className="flex-between w-full mb-16 pt-3">
//             <div className="flex gap-2 flex-center">
//                 <Link href="/">
//                     <Image 
//                         src='/assets/icons/massage-icon.png'
//                         width={40}
//                         height={40}
//                         className="object-contain"
//                     />
//                     <p className="logo_text">
//                         Cip de Vries, RMT
//                     </p>
//                 </Link>
//             </div>
//             {/* desktop navigation */}
//             <div className="sm:flex hidden">
//                 <Link href='/services' className="flex gap-2 flex-center pr-5">
//                     Services
//                 </Link>
//                 {isUserLoggedIn ? (
//                     <div className="flex gap-3 md:gap-5">
//                         <Link href='/login' className="black_btn">
//                             Sign Out
//                         </Link>
//                     </div>
//                 ) : (
//                     <>
//                         {providers && Object.values(providers).map((provider)=>(
//                             <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
//                                 Sign In
//                             </button>
//                         ))}
//                     </>
//                 )}
//             </div>
//             {/* mobile navigation */}
//             <div className="sm:hidden flex relative">
//                 {isUserLoggedIn ? (
//                     <div className="flex">
//                         <Image 
//                             onClick={()=> settoggleDropdown((prev)=> !prev)}
//                             src='/assets/images/css-logo.png'
//                             width={40}
//                             height={40}
//                             className="object-contain"
//                         />
//                         {toggleDropdown && (
//                             <div className="dropdown">
//                                 <Link href='/services' className="dropdown_link" onClick={()=> settoggleDropdown(false)}>
//                                     Services
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <>
//                         {providers && Object.values(providers).map((provider)=>(
//                             <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
//                                 Sign In
//                             </button>
//                         ))}
//                     </>
//                 )}
//             </div>
            
//         </nav>
//     )
// }

// export default Navbar
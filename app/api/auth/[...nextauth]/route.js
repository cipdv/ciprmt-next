import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "@utils/database"
import User from "@models/user"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: ""},
                password: { label: "Password", type: "password", placeholder: ""}
            },

            async authorize(credentials) {
                const {email, password} = credentials
                
                try {
                    await connectToDb()

                    const user = await User.findOne({ email })

                    if(!user) {
                        return new NextResponse(400, { error: 'User not found' })
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    if(!passwordsMatch) {
                        return new NextResponse(400, { error: 'Incorrect password' })
                    } 

                    return user
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    strategy: {
       jwt: true
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user._id
                token.email = user.email
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.phoneNumber = user.phoneNumber
            }          
          return token
        },
        async session({ session, token }) {
            const sessionUser = await User.findOne({ email: token.email })

            if(!sessionUser) {
                return null
            } else {
                session.user = {
                    id: sessionUser._id,
                    email: sessionUser.email,
                    firstName: sessionUser.firstName,
                    lastName: sessionUser.lastName,
                    phoneNumber: sessionUser.phoneNumber,
                }

                return session
            }
      },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}
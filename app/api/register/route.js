import { NextResponse} from 'next/server';
import bcrypt from "bcrypt";
import { connectToDb } from '@utils/database';
import User from '@models/user';

export async function POST(req) {
    
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, userType } = await req.json()
    
    try {

        await connectToDb()

        if(!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
            return new NextResponse(400, { error: 'Please fill in all fields' })
        }

        if(password !== confirmPassword) {
            return new NextResponse(400, { error: 'Passwords do not match' })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return new NextResponse(400, { error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            phoneNumber: phoneNumber.replace("-", "").replace(" ", ""),
            email: email.toLowerCase(),
            password: hashedPassword,
            userType
        })

        return new NextResponse(JSON.stringify(user), {
            status: 200
        })

    } catch (error) {
        console.log(error)
    }
}
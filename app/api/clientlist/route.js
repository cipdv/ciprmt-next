import { NextResponse} from 'next/server';
import { connectToDb } from '@utils/database';
import User from '@models/user';

export const GET = async (request) => {
    try {
        await connectToDb()

        const clients = await User.find()

        return new Response(JSON.stringify(clients), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}
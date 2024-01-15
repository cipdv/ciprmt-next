import { NextResponse} from 'next/server';
import { connectToDb } from '@utils/database';
import HealthHistory from '@models/healthHistory';

export const GET = async (request) => {
    try {
        await connectToDb()

        // const { pathname } = request.nextUrl
        // const id = pathname.split('/').pop()

        //for testing: consent = false, date is in the past
        // const id = '63530938ed3d43da502cce4b'

        //for testing: no health history
        const id = '656f52d31b13d4c32fbe4473'


        const healthHistory = await HealthHistory.find({ clientId: id })

        if(healthHistory.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200
            })
        }
        // if(healthHistory.length === 0) {
        //     return new Response(JSON.stringify({ message: 'No healthHistory found' }), {
        //         status: 404
        //     })
        // }

        return new Response(JSON.stringify(healthHistory), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}
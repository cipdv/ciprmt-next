import { NextResponse} from 'next/server';
import { connectToDb } from '@utils/database';
import Treatment from '@models/treatments';

export const GET = async (request) => {
    try {
        await connectToDb()

        // const { pathname } = request.nextUrl
        // const id = pathname.split('/').pop()

        //for testing: consent = false, date is in the past
        const id = '63530938ed3d43da502cce4b'
        //for testing: client id with many treatments
        // const id = '6203d244d2683635040b1e4e'


        const treatments = await Treatment.find({ clientId: id })

        if(treatments.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200
            })
        }
        // if(treatments.length === 0) {
        //     return new Response(JSON.stringify({ message: 'No treatments found' }), {
        //         status: 404
        //     })
        // }

        return new Response(JSON.stringify(treatments), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}
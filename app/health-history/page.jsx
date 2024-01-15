import { connectToDb } from '@utils/database';
import HealthHistory from '@models/healthHistory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import HealthHistoryForm from '@components/HealthHistoryForm';

const HealthHistoryPage = async () => {

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id.toString(); // Convert userId to string

    await connectToDb() 
    let healthHistory = (await HealthHistory.find({ clientId: userId })).map(doc => {
        const plainObject = doc.toObject();
        plainObject._id = plainObject._id.toString(); // Convert _id to string
        if (plainObject.dateOfBirth) {
            plainObject.dateOfBirth = plainObject.dateOfBirth.toISOString();
        }
        if (plainObject.createdAt) {
            plainObject.createdAt = plainObject.createdAt.toISOString();
        }
        return plainObject;
    });

    // Sort the array by createdAt in descending order and select the first item
    healthHistory = healthHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    return (
        <div>
            <h1>HealthHistory</h1>
            <HealthHistoryForm healthHistory={healthHistory} userId={userId} />        
        </div>
    );
};

export default HealthHistoryPage
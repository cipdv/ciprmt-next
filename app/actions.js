'use server'

import { connectToDb } from '@utils/database';
import HealthHistory from '@models/healthHistory';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache';
import { z } from 'zod'
import {FormDataSchema} from '@app/lib/HHFormSchema'

export const updateHH = async (formData, userId) => {
    const result = FormDataSchema.safeParse(formData)
    // const rawFormData = {
    //     clientId: userId,
    //     createdAt: new Date(), 
    //     pronouns: formData.get("pronouns"),
    //     medications: formData.get("medications"),
    //     dateOfBirth: formData.get("dateOfBirth"),
    //     occupation: formData.get("occupation"),
    //     phoneNumber: formData.get("phoneNumber"),
    //     address: {
    //         streetNumber: formData.get("addressStreetNumber"),
    //         streetName: formData.get("addressStreetName"),
    //         city: formData.get("addressCity"),
    //         province: formData.get("addressProvince"),
    //     },
    //     doctor: {
    //         noDoctor: formData.get("noDoctor") === 'on',
    //         doctorName: formData.get("doctorName"),
    //         doctorAddress: {
    //             doctorStreetNumber: formData.get("doctorStreetNumber"),
    //             doctorStreetName: formData.get("doctorStreetName"),
    //             doctorCity: formData.get("doctorCity"),
    //             doctorProvince: formData.get("doctorProvince"),
    //         },
    //     },
    //     generalHealth: formData.get("generalHealth"),
    //     historyOfMassage: formData.get("historyOfMassage"),
    //     otherHCP: formData.get("otherHCP"),
    //     injuries: formData.get("injuries"),
    //     surgeries: formData.get("surgeries"),
    //     epilepsy: formData.get("epilepsy") === 'on',
    //     diabetes: formData.get("diabetes")  === 'on',
    //     cancer: formData.get("cancer")  === 'on',
    //     arthritis: formData.get("arthritis")  === 'on',
    //     chronicHeadaches: formData.get("chronicHeadaches")  === 'on',
    //     migraineHeadaches: formData.get("migraineHeadaches")  === 'on',
    //     visionLoss: formData.get("visionLoss")  === 'on',
    //     hearingLoss: formData.get("hearingLoss")  === 'on',
    //     osteoporosis: formData.get("osteoporosis")  === 'on',
    //     haemophilia: formData.get("haemophilia")  === 'on',
    //     cardioNone: formData.get("cardioNone")  === 'on',
    //     highBloodPressure: formData.get("highBloodPressure")  === 'on',
    //     lowBloodPressure: formData.get("lowBloodPressure")  === 'on',
    //     heartAttack: formData.get("heartAttack")  === 'on',
    //     stroke: formData.get("stroke")  === 'on',
    //     vericoseVeins: formData.get("vericoseVeins")  === 'on',
    //     pacemaker: formData.get("pacemaker")  === 'on',
    //     heartDisease: formData.get("heartDisease")  === 'on',
    //     respNone: formData.get("respNone")  === 'on',
    //     chronicCough: formData.get("chronicCough")  === 'on',
    //     bronchitis: formData.get("bronchitis")  === 'on',
    //     asthma: formData.get("asthma")  === 'on',
    //     emphysema: formData.get("emphysema")  === 'on',
    //     skinConditions: formData.get("skinConditions"),
    //     infectiousConditions: formData.get("infectiousConditions"),
    //     otherMedicalConditions: formData.get("otherMedicalConditions"),
    //     lossOfFeeling: formData.get("lossOfFeeling"),
    //     allergies: formData.get("allergies"),
    //     pregnant: formData.get("pregnant"),
    //     privacyPolicy: formData.get("privacyPolicy")  === 'on',
    // }
    
    if (!result.success) {
        return { message: "Failed to create todo" };
      }
    //validate the userId and handle errors and empty fields
    if(result.success) {
        try {
            formData.clientId = userId;
            formData.createdAt = new Date().toISOString();
            await connectToDb();
            const updatedHH = await HealthHistory.create(
                formData
            )
    
        } catch (error) {
            console.log(error)
        }
        revalidatePath('/health-history')
        redirect('/')
    }
    
}

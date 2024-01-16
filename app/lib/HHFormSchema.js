import { z } from 'zod'

export const FormDataSchema = z.object({
    pronouns: z.string().min(1, { message: 'Please select your pronouns' }),
    dateOfBirth: z.string().min(1, { message: 'Please enter your date of birth' }),
    occupation: z.string().min(1, { message: 'Please enter your occupation' }),
    phoneNumber: z.string().min(1, { message: 'Please enter your phone number' }),
    address: z.object({
        streetNumber: z.string().min(1, { message: 'Please enter your street number' }),
        streetName: z.string().min(1, { message: 'Please enter your street name' }),
        city: z.string().min(1, { message: 'Please enter your city' }),
        province: z.string().min(1, { message: 'Please enter your province' }),
    }),
    doctor: z.object({
        noDoctor: z.boolean(),
        doctorName: z.string().optional(),
        doctorAddress: z.object({
            doctorStreetNumber: z.string().optional(),
            doctorStreetName: z.string().optional(),
            doctorCity: z.string().optional(),
            doctorProvince: z.string().optional()
        }).optional(),
    }).superRefine((val, ctx) => {
        if (val.noDoctor === false && !val.doctorName || val.noDoctor === false && !val.doctorAddress.doctorStreetNumber || val.noDoctor === false && !val.doctorAddress.doctorStreetName || val.noDoctor === false && !val.doctorAddress.doctorCity || val.noDoctor === false && !val.doctorAddress.doctorProvince) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Please provide your doctor's information. If you do not have a doctor, please select 'I do not have a family doctor.'`,
                path: ['noDoctor']
            })
        }

        return true
    }),
    generalHealth: z.string().min(1, { message: 'Please describe the state of your overall health' }),
    medications: z.string(),
    historyOfMassage: z.string().min(1, {message: 'Please provide some insight of your history with massage therapy'}),
    otherHCP: z.string(),
    injuries: z.string(),
    surgeries: z.string(),
    epilepsy: z.boolean(),
    diabetes: z.boolean(),
    cancer: z.boolean(),
    arthritis: z.boolean(),
    chronicHeadaches: z.boolean(),
    migraineHeadaches: z.boolean(),
    visionLoss: z.boolean(),
    hearingLoss: z.boolean(),
    osteoporosis: z.boolean(),
    haemophilia: z.boolean(),
    cardioNone: z.boolean(),
    highBloodPressure: z.boolean(),
    lowBloodPressure: z.boolean(),
    heartAttack: z.boolean(),
    stroke: z.boolean(),
    vericoseVeins: z.boolean(),
    pacemaker: z.boolean(),
    heartDisease: z.boolean(),
    respNone: z.boolean(),
    chronicCough: z.boolean(),
    bronchitis: z.boolean(),
    asthma: z.boolean(),
    emphysema: z.boolean(),
    skinConditions:  z.string(),
    infectiousConditions: z.string(),
    otherMedicalConditions: z.string(),
    lossOfFeeling: z.string(),
    allergies: z.string(),
    pregnant: z.string().min(1, {message: 'Please provide an answer'}),
    privacyPolicy: z.boolean().refine(val => val === true, { message: 'Please read and agree to the privacy policy to continue' }),
})



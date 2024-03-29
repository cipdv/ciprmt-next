import { Schema, model, models, mongoose } from 'mongoose';

const HealthHistorySchema = new Schema({
    clientId: String,
    createdAt: {type: Date, default: new Date()},
    pronouns: String,
    occupation: String,
    phoneNumber: {type: String, required: [true, 'phone number blank']},
    address: {
        streetNumber: {type: String, required: [true, 'street number blank']},
        streetName: {type: String, required: [true, 'street name blank']},
        city: {type: String, required: [true, 'city blank']},
        province: {type: String, required: [true, 'province blank']},
    },
    dateOfBirth: {type: Date, required: [true, 'date of birth blank']},
    doctor: {
        noDoctor: Boolean,
        doctorName: {type: String},
        doctorAddress: {
            doctorStreetNumber: String,
            doctorStreetName: String,
            doctorCity: String,
            doctorProvince: String
        },
    },
    generalHealth: {type: String, required: [true, 'general health blank']},
    historyOfMassage: {type: String, required: [true, 'history of massage blank']},
    injuries: String,
    surgeries: String,
    otherHCP: String,
    cardioNone: Boolean,
    highBloodPressure: Boolean,
    lowBloodPressure: Boolean,
    heartAttack: Boolean,
    vericoseVeins: Boolean,
    stroke: Boolean,
    pacemaker: Boolean,
    heartDisease: Boolean,
    respNone: Boolean,
    chronicCough: Boolean,
    bronchitis: Boolean,
    asthma: Boolean,
    emphysema: Boolean,
    skinConditions: String,
    infectiousConditions: String,
    diabetes: Boolean,
    epilepsy: Boolean,
    cancer: Boolean,
    arthritis: Boolean,
    arthritisFamilyHistory: Boolean,
    chronicHeadaches: Boolean,
    migraineHeadaches: Boolean,
    visionLoss: Boolean, 
    hearingLoss: Boolean,
    osteoporosis: Boolean,
    haemophilia: Boolean,
    internalEquipment: String,
    otherMedicalConditions: String,
    lossOfFeeling: String,
    allergies: String,
    pregnant: String,
    medications: String,
    privacyPolicy: {type: Boolean, required: [true, 'privacy policy left unchecked']},
    sourceOfReferral: String
})

const HealthHistory = models.HealthHistory || model("HealthHistory", HealthHistorySchema);

export default HealthHistory;
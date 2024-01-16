'use client'

import Link from 'next/link'
import { updateHH } from '@app/actions';
import { useForm, submitHandler } from 'react-hook-form';
import { useFormStatus} from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {FormDataSchema} from '@app/lib/HHFormSchema'

const HealthHistoryForm = ({ healthHistory, userId }) => {

    const { pending } = useFormStatus();

    const dateOfBirth = healthHistory?.dateOfBirth ? new Date(healthHistory.dateOfBirth).toISOString().slice(0, 10) : ''; 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(FormDataSchema),
        defaultValues: {
            pronouns: healthHistory?.pronouns || '',
            dateOfBirth: dateOfBirth,
            occupation: healthHistory?.occupation || '',
            phoneNumber: healthHistory?.phoneNumber || '',
            addressStreetNumber: healthHistory?.address?.streetNumber || '',
            addressStreetName: healthHistory?.address?.streetName || '',
            addressCity: healthHistory?.address?.city || '',
            addressProvince: healthHistory?.address?.province || '',
            doctorName: healthHistory?.doctor?.doctorName || '',
            doctorStreetNumber: healthHistory?.doctor?.doctorAddress?.doctorStreetNumber || '',
            doctorStreetName: healthHistory?.doctor?.doctorAddress?.doctorStreetName || '',
            doctorCity: healthHistory?.doctor?.doctorAddress?.doctorCity || '',
            doctorProvince: healthHistory?.doctor?.doctorAddress?.doctorProvince || '',
            generalHealth: healthHistory?.generalHealth || '',
            medications: healthHistory?.medications || '',
            historyOfMassage: healthHistory?.historyOfMassage || '',
            otherHCP: healthHistory?.otherHCP || '',
            injuries: healthHistory?.injuries || '',
            surgeries: healthHistory?.surgeries || '',
            epilepsy: healthHistory?.epilepsy || false,
            diabetes: healthHistory?.diabetes || false,
            cancer: healthHistory?.cancer || false,
            arthritis: healthHistory?.arthritis || false,
            chronicHeadaches: healthHistory?.chronicHeadaches || false,
            migraineHeadaches: healthHistory?.migraineHeadaches || false,
            visionLoss: healthHistory?.visionLoss || false,
            hearingLoss: healthHistory?.hearingLoss || false,
            osteoporosis: healthHistory?.osteoporosis || false,
            haemophilia: healthHistory?.haemophilia || false,
            cardioNone: healthHistory?.cardioNone || false,
            highBloodPressure: healthHistory?.highBloodPressure || false,
            lowBloodPressure: healthHistory?.lowBloodPressure || false,
            heartAttack: healthHistory?.heartAttack || false,
            stroke: healthHistory?.stroke || false,
            vericoseVeins: healthHistory?.vericoseVeins || false,
            pacemaker: healthHistory?.pacemaker || false,
            heartDisease: healthHistory?.heartDisease || false,
            respNone: healthHistory?.respNone || false,
            chronicCough: healthHistory?.chronicCough || false,
            bronchitis: healthHistory?.bronchitis || false,
            asthma: healthHistory?.asthma || false,
            emphysema: healthHistory?.emphysema || false,
            skinConditions: healthHistory?.skinConditions || '',
            infectiousConditions: healthHistory?.infectiousConditions || '',
            otherMedicalConditions: healthHistory?.otherMedicalConditions || '',
            lossOfFeeling: healthHistory?.lossOfFeeling || '',
            allergies: healthHistory?.allergies || '',
            pregnant: healthHistory?.pregnant || '',
            privacyPolicy: healthHistory?.privacyPolicy || false
        }
    });


    console.log(errors)

    const processHHForm = async formData => {
        try {
            // Validate and parse formData using your schema
            const validatedData = await FormDataSchema.parseAsync(formData);

            // Pass the validated data to updateHH
            await updateHH(validatedData, userId);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Log all validation errors
                error.errors.forEach(err => console.log(err.message));
            } else {
                // Handle other errors
                console.error(error);
            }
        }
    };

  return (
    <div className="px-4 md:px-0">
        {/* <form className="w-full mx-auto" action={async formData => await updateHH(formData, userId)}> */}
        <form className="w-full mx-auto" onSubmit={handleSubmit(processHHForm)}>

            <div>
                <h3>Personal info:</h3>
                <div>
                    <label>Pronouns</label>
                    <select 
                        className="w-full" 
                        name="pronouns" 
                        label="Pronouns" 
                        defaultValue={healthHistory?.pronouns || ""} 
                        {...register('pronouns')}
                    >
                        <option value="" disabled="disabled">Select your pronouns</option>
                        <option value="they/them">They/them</option>
                        <option value="she/her">She/her</option>
                        <option value="he/him">He/him</option>
                        <option value="other">Other</option>
                    </select>
                    {errors?.pronouns && <p className="text-red-500">{errors?.pronouns?.message}</p>}
                </div>
                    <div>
                        <label>Date of birth</label>
                        <input className="w-full" name="dateOfBirth" label="Date of birth" type="date" defaultValue={dateOfBirth} 
                        {...register('dateOfBirth')}
                        />
                        {errors?.dateOfBirth && <p className="text-red-500">{errors?.dateOfBirth?.message}</p>}                
                    </div>
                <div>
                    <label>Occupation</label>
                    <input 
                        className={`w-full ${errors?.occupation && 'border border-red-500'}`} 
                        name="occupation" 
                        type="text" 
                        defaultValue={healthHistory?.occupation} 
                        {...register('occupation')}
                    />
                    {errors?.occupation && <p className="text-red-500">{errors?.occupation?.message}</p>}
                </div>
                <div>
                    <h3>Contact info:</h3>
                        <div>
                            <label>Phone number</label>
                            <input className="w-full" name="phoneNumber" type="text" defaultValue={healthHistory?.phoneNumber}
                            {...register('phoneNumber')}
                            />
                            {errors?.phoneNumber && <p className="text-red-500">{errors?.phoneNumber?.message}</p>}
                        </div>
                        <div>
                            <h5>Address</h5>
                            <label>Street number</label>
                            <input
                                className="w-full" 
                                name="addressStreetNumber" 
                                type="text" 
                                defaultValue={healthHistory ? healthHistory?.address?.streetNumber : ''} 
                                placeholder={errors?.address?.streetNumber ? errors?.address?.streetNumber?.message : ''}
                                {...register('address.streetNumber')}
                            />
                            {errors?.address?.streetNumber && <p className="text-red-500">{errors?.address?.streetNumber?.message}</p>}
                            <div><label>Street name</label>
                            <input 
                                className="w-full required:text-red-500"
                                name="addressStreetName" 
                                type="text" 
                                defaultValue={healthHistory ? healthHistory?.address?.streetName : ''} 
                                {...register('address.streetName')}
                            />
                            {errors?.address?.streetName && <p className="text-red-500">{errors?.address?.streetName?.message}</p>}
                            </div>  
                            <div>
                            <label>City</label>
                            <input 
                                className="w-full"
                                name="addressCity" 
                                type="text" 
                                defaultValue={healthHistory ? healthHistory?.address?.city : ''} 
                                {...register('address.city')}
                            />
                            {errors?.address?.city && <p className="text-red-500">{errors?.address?.city?.message}</p>}
                            </div>
                            <label>Province</label>
                            <select className="w-full" name="addressProvince" defaultValue={healthHistory ? healthHistory?.address?.province : ''} 
                            {...register('address.province')}
                            >
                                <option value="" disabled="disabled">Select your province</option>
                                <option value="ON">Ontario</option>
                                <option value="AB">Alberta</option>
                                <option value="BC">British Columbia</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="MB">Manitoba</option>
                                <option value="QB">Quebec</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NF">Newfoundland</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="YK">Yukon</option>
                                <option value="NV">Nunavut</option>
                                <option value="US">USA</option>
                            </select>
                            {errors?.address?.province && <p className="text-red-500">{errors?.address?.province?.message}</p>}
                        </div>
                        
                </div>
                    <div>
                        <h3>Doctor's contact info:</h3>
                        <div>
                            <input 
                                type="checkbox" 
                                id="noDoctor" 
                                name="noDoctor" 
                                defaultChecked={healthHistory?.doctor?.noDoctor} 
                                {...register('doctor.noDoctor')}
                            />
                            <label htmlFor="noDoctor">I do not have a family doctor</label>
                            {errors?.doctor?.noDoctor && <p className="text-red-500">{errors?.doctor?.noDoctor?.message}</p>}
                        </div>
                        <label>Doctor's name</label>
                        <input  className="w-full"
                            name="doctorName" 
                            label="Doctor's name" 
                            type="text" 
                            defaultValue={healthHistory ? healthHistory?.doctor?.doctorName : ''} 
                            {...register('doctor.doctorName')}
                        />

                        {errors?.doctor?.doctorName && <p className="text-red-500">{errors?.doctor?.doctorName?.message}</p>}
                        <h4><b>Doctor's address:</b>    </h4>
                            <label>Street Number</label>
                            <input className="w-full"
                                name="doctorStreetNumber" 
                                label="Street number" 
                                type="text" 
                                defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetNumber} 
                                {...register('doctor.doctorAddress.doctorStreetNumber')}
                            />
                            {errors?.doctor?.doctorAddress?.doctorStreetNumber && <p className="text-red-500">{errors?.doctor?.doctorAddress?.doctorStreetNumber?.message}</p>}
                            <label>Street name</label>
                            <input className="w-full"
                                name="doctorStreetName" 
                                type="text" 
                                defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetName} 
                                {...register('doctor.doctorAddress.doctorStreetName')}
                            />
                            {errors?.doctor?.doctorAddress?.doctorStreetName && <p className="text-red-500">{errors?.doctor?.doctorAddress?.doctorStreetName?.message}</p>}
                            <label>City</label>
                            <input className="w-full"
                            name="doctorCity" 
                            type="text" 
                            defaultValue={healthHistory?.doctor?.doctorAddress?.doctorCity} 
                            {...register('doctor.doctorAddress.doctorCity')}
                            />
                            {errors?.doctor?.doctorAddress?.doctorCity && <p className="text-red-500">{errors?.doctor?.doctorAddress?.doctorCity?.message}</p>}
                            <label>Province</label>
                            <select className="w-full"
                            name="doctorProvince" 
                            defaultValue={healthHistory ? healthHistory?.doctor?.doctorAddress?.doctorProvince : ''} 
                            {...register('doctor.doctorAddress.doctorProvince')}
                            >
                                <option value="" disabled="disabled">Select your province</option>
                                <option value="ON">Ontario</option>
                                <option value="AB">Alberta</option>
                                <option value="BC">British Columbia</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="MB">Manitoba</option>
                                <option value="QB">Quebec</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NF">Newfoundland</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="YK">Yukon</option>
                                <option value="NV">Nunavut</option>
                                <option value="US">USA</option>
                            </select> 
                            {errors?.doctor?.doctorAddress?.doctorProvince && <p className="text-red-500">{errors?.doctor?.doctorAddress?.doctorProvince?.message}</p>}
                    </div>
                    <div>
                    <h3>Health history:</h3>
                    <div className='pt-5'>
                        <label>How would you describe your overall health</label>
                        <input className="w-full" name="generalHealth" label="How would you describe your overall health?" defaultValue={healthHistory?.generalHealth} type="text" 
                        {...register('generalHealth')}
                        />
                        {errors?.generalHealth && <p className="text-red-500">{errors?.generalHealth?.message}</p>}
                    </div>
                    <div>
                        <label >Current medications taken</label>
                        <input className='w-full' type="text" defaultValue={healthHistory?.medications}  name="medications" placeholder='include all medications you are currently taking'
                        {...register('medications')}
                        />
                    </div>
            
                    <div>
                        <label>What is your history with massage therapy?</label>
                        <input className="w-full" name="historyOfMassage" label="What is your history with massage therapy?" type="text" defaultValue={healthHistory?.historyOfMassage} 
                        {...register('historyOfMassage')}
                        />
                        {errors?.historyOfMassage && <p className="text-red-500">{errors?.historyOfMassage?.message}</p>}
                    </div>
                    <div>
                        <label>What other treatments from another Health Care Provider have you received in the past year?</label>
                        <input className="w-full" name="otherHCP" type="text" defaultValue={healthHistory?.otherHCP}  
                        {...register('otherHCP')}
                        />
                    </div>
                    <div>
                        <label>What injuries, if any, have you had in the past year?</label>
                        <input className="w-full" name="injuries" label="Have you had any injuries in the past year?" type="text" defaultValue={healthHistory?.injuries}  
                        {...register('injuries')}
                        />
                    </div>
                    <div>
                        <label>Please list any surgeries you have had in the past 2 years:</label>
                        <input className="w-full" name="surgeries" label="Have you had any surgeries in the past 2 years?" type="text" defaultValue={healthHistory?.surgeries} 
                        {...register('surgeries')}
                        />
                    </div>
                    <div className='pt-5'>
                        <h4>Do you have any of the following medical conditions?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                            <div className="flex items-center">
                                <input className="mr-2" name="epilepsy" type="checkbox" defaultChecked={healthHistory?.epilepsy} 
                                {...register('epilepsy')}
                                />
                                <label>Epilepsy</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="diabetes" type="checkbox" defaultChecked={healthHistory?.diabetes}  
                                {...register('diabetes')}
                                />
                                <label>Diabetes</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="cancer" type="checkbox" defaultChecked={healthHistory?.cancer}  
                                {...register('cancer')} 
                                />
                                <label>Cancer</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="arthritis" type="checkbox" defaultChecked={healthHistory?.arthritis}  
                                {...register('arthritis')}
                                />
                                <label>Arthritis</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="chronicHeadaches" type="checkbox" defaultChecked={healthHistory?.chronicHeadaches}  
                                {...register('chronicHeadaches')}
                                />
                                <label>Chronic Headaches</label>
                            </div>
                            <div className="flex items-center">   
                                <input className="mr-2" name="migraineHeadaches" type="checkbox" defaultChecked={healthHistory?.migraineHeadaches} 
                                {...register('migraineHeadaches')}
                                />
                                <label>Migraine Headaches</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="visionLoss" type="checkbox" defaultChecked={healthHistory?.visionLoss} 
                                {...register('visionLoss')}
                                />
                                <label>Vision Loss</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="hearingLoss" type="checkbox" defaultChecked={healthHistory?.hearingLoss}  
                                {...register('hearingLoss')}
                                />
                                <label>Hearing Loss</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="osteoporosis" type="checkbox" defaultChecked={healthHistory?.osteoporosis} 
                                {...register('osteoporosis')}
                                />
                                <label>Osteoporosis</label>
                            </div>
                            <div className="flex items-center">
                                <input className="mr-2" name="haemophilia" type="checkbox" defaultChecked={healthHistory?.haemophilia} 
                                {...register('haemophilia')}
                                />
                                <label>Haemophilia</label>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <h4>Do you have any of the following cardiovascular conditions?</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                                <div className="flex items-center">
                                    <input className="mr-2" name="cardioNone" type="checkbox" defaultChecked={healthHistory?.cardioNone} 
                                    {...register('cardioNone')}
                                    />
                                    <label>None</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="highBloodPressure" type="checkbox" defaultChecked={healthHistory?.highBloodPressure} 
                                    {...register('highBloodPressure')}
                                    />
                                    <label>High blood pressure</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="lowBloodPressure" type="checkbox" defaultChecked={healthHistory?.lowBloodPressure}  
                                    {...register('lowBloodPressure')}
                                    />
                                    <label>Low blood pressure</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="heartAttack" type="checkbox" defaultChecked={healthHistory?.heartAttack}  
                                    {...register('heartAttack')}
                                    />
                                    <label>History of heart attacks</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="stroke" type="checkbox" defaultChecked={healthHistory?.stroke}  
                                    {...register('stroke')}
                                    />
                                    <label>Stroke</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="vericoseVeins" type="checkbox" defaultChecked={healthHistory?.vericoseVeins} 
                                    {...register('vericoseVeins')}
                                    />
                                    <label>Vericose Veins</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="pacemaker" type="checkbox" defaultChecked={healthHistory?.pacemaker}  
                                    {...register('pacemaker')}
                                    />
                                    <label>Pacemaker</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="heartDisease" type="checkbox" defaultChecked={healthHistory?.heartDisease}  
                                    {...register('heartDisease')}
                                    />
                                    <label>Heart disease</label>
                                </div>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <h4>Do you have any of the following respiratory conditions?</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                                <div className="flex items-center">
                                    <input className="mr-2" name="respNone" type="checkbox" defaultChecked={healthHistory?.respNone}  
                                    {...register('respNone')}
                                    />
                                    <label>None</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="chronicCough" type="checkbox" defaultChecked={healthHistory?.chronicCough}  
                                    {...register('chronicCough')}
                                    />
                                    <label>Chronic cough</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="bronchitis" type="checkbox" defaultChecked={healthHistory?.bronchitis}  
                                    {...register('bronchitis')}
                                    />
                                    <label>Bronchitis</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="asthma" type="checkbox" defaultChecked={healthHistory?.asthma}  
                                    {...register('asthma')}
                                    />
                                    <label>Asthma</label>
                                </div>
                                <div className="flex items-center">
                                    <input className="mr-2" name="emphysema" type="checkbox" defaultChecked={healthHistory?.emphysema}  
                                    {...register('emphysema')}
                                    />
                                    <label>Emphysema</label>
                                </div>
                            </div>   
                        </div>         
                        <div className='pt-5'>
                        <h4>Please list any skin conditions that you have experienced in the past year:</h4>
                        <input name="skinConditions" type="text" defaultValue={healthHistory?.skinConditions}  
                        {...register('skinConditions')}
                        />
                    </div>
                    <div>
                        <h4>Please list any infectious conditions you have had in the past year:</h4>
                        <input name="infectiousConditions" type="text" defaultValue={healthHistory?.infectiousConditions}  
                        {...register('infectiousConditions')}
                        />
                    </div>
                    <div>
                        <h4>Please list any other medical conditions that you have:</h4>
                        <input name="otherMedicalConditions" type="text" defaultValue={healthHistory?.otherMedicalConditions}  
                        {...register('otherMedicalConditions')}
                        />
                    </div>
                    <div>
                        <h4>Please describe any loss of feeling, numbness, or tingling you have experienced recently:</h4>
                        <input name="lossOfFeeling" type="text" defaultValue={healthHistory?.lossOfFeeling}  
                        {...register('lossOfFeeling')}
                        />
                    </div>
                    <div>
                        <h4>Please list all allergies that you have:</h4>
                        <input name="allergies" type="text" defaultValue={healthHistory?.allergies}  
                        {...register('allergies')}
                        />
                    </div>
                    <div>
                        <h4>Are you currently pregnant?</h4>
                        <select name="pregnant" defaultValue={healthHistory ? healthHistory?.pregnant : ''} 
                        {...register('pregnant')}
                        >
                            <option value="" disabled="disabled">Select a value</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                            <option value='na'>Not applicable</option>
                        </select>
                        {errors?.pregnant && <p className="text-red-500">{errors?.pregnant?.message}</p>}
                    </div>           
                    </div>
                    </div>
                    </div>
                    <div>
                        <h3>Privacy Policy</h3>
                        <div className="flex items-center">
                        <input className="mr-2" name="privacyPolicy" type="checkbox" defaultChecked={healthHistory?.privacyPolicy}  
                        
                        {...register('privacyPolicy')}
                        />
                        <label>By clicking here you are indicating that you have read and agree to the <Link className='text-blue-500' href='/privacy-policy'>privacy policy</Link>.</label>
                        </div>
                        {errors?.privacyPolicy && <p className="text-red-500">{errors?.privacyPolicy?.message}</p>}
                    </div>
            <button className='btn_register mt-5' type='submit'>
                {pending ? 'Updating...' : 'Update'}
            </button>
        </form>
    </div>
  )
}

export default HealthHistoryForm
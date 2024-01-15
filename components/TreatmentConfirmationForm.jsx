import React, {useState} from 'react'

const TreatmentConfirmationForm = ({treatmentId, treatment, treatmentDateTime, currentDateTime, strTime}) => {

    // console.log(treatment)
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        reasonForMassage: '',
        notesFromClient: '',
        chestConsent: false,
        abdomenConsent: false,
        glutesConsent: false,
        innerThighsConsent: false,
        areasToAvoid: '',
        id: treatmentId
    });

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(data)
        // setSubmitting(true);
        // try {
        //     const res = await fetch('/api/treatments', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     setSubmitting(false);
        //     const json = await res.json();
        //     if (!res.ok) throw Error(json.message);
        //     alert('Treatment confirmed');
        // } catch (e) {
        //     throw Error(e.message);
        // }
    }

    return (
        <div className='mt-5 mb-10'>
            {treatmentDateTime < currentDateTime ? (
                <div>
                    <h1>Please complete this confirmation and consent form for your past appointment on {treatment.date} at {strTime}</h1>
                </div>
            ) : (
                <div>
                    <h1>Please complete this confirmation and consent form for your upcoming appointment on {treatment.date} at {strTime}</h1>
                </div>
            )}
            <form onSubmit={handleSubmit} className='pt-5'>
                <div>
                    <h3>Reason for booking massage:</h3>                                      
                        <p className='mt-2'>
                            If you have a specific issue, please include the location and nature of the discomfort.
                        </p>                                     
                    <textarea onChange={(e)=>{setData({...data, reasonForMassage: e.target.value})}} name="reasonForMassage" placeholder='Eg. Relaxation, pain or discomfort relief, general wellbeing' />               
                </div>
                <div>
                    <p className='mt-2'>If there's any other information you'd like me to know before the massage, include it here:</p>
                    <textarea  onChange={(e)=>{setData({...data, notesFromClient: e.target.value})}} name="notesFromClient" placeholder='eg. recent injuries or surgeries' />
                </div>
                <div className='pt-5'>
                    <h3>Consent</h3>
                    <p className='pt-2'>
                        Your comfort and safety during your massage are my top priority. There are areas in the body that most people would consider to be sensitive, and RMTs are required to get written consent to assess and treat these areas before every treatment. Consenting through this form to assess and massage the following areas during this appointment does not preclude you from revoking your consent before or during the massage. Please feel welcome to express this at any time during the massage. Your comfort is essential to a successful massage therapy session.
                    </p>
                    <p className='pt-5'>
                        <a href="/consentinfo">Click here</a> to learn more about these areas, what assessment and treatment entails, and why this information is being asked.
                    </p>
                    <p className='pt-5 font-bold'>Please indicate which of the following areas you give consent to assess and massage:</p>
                    <div className='pt-5 ml-5'>
                        <div className='checkbox-group'>
                            <label className='container'>Chest wall muscles
                                <input type="checkbox" checked={data.chestConsent} onChange={(e) => setData({...data, chestConsent: e.target.checked})} />
                            </label>
                        </div>
                        <div className='checkbox-group'>
                            <label>Abdominal muscles
                                <input type="checkbox" checked={data.abdomenConsent} onChange={(e) => setData({...data, abdomenConsent: e.target.checked})} />
                                <span ></span>
                            </label>
                        </div>
                        <div className='checkbox-group'>
                            <label>Gluteal muscles (buttocks)
                                <input type="checkbox" checked={data.glutesConsent} onChange={(e) => setData({...data, glutesConsent: e.target.checked})} />
                            </label>
                        </div>
                        <div className='checkbox-group'>
                            <label>Inner thigh muscles
                                <input type="checkbox" checked={data.innerThighsConsent} onChange={(e) => setData({...data, innerThighsConsent: e.target.checked})} />
                                <span ></span>
                            </label>
                        </div>
                </div>
                <div className='pt-5'>
                    <p>Are there any other areas you do not want to have massaged during this session?</p>
                    <input className='mt-3' type="text" value={data.areasToAvoid} onChange={(e)=>{setData({...data, areasToAvoid: e.target.value})}} name="consents.areasToAvoid" placeholder='eg. face, feet, hands'/>
                </div>
                            {/* <div>
                                
                                <label>Signature</label>
                                <p>
                                    By signing here, you acknowledge that you have read and understand the information regarding consent and give your informed consent at this time for the assessment and/or treatment of the areas selected above. 
                                </p>
                                <SignatureCanvas ref={sensitiveConsentSig} onEnd={sensitiveConsentPng} penColor='black' backgroundColor='white' canvasProps={{width: 300, height: 60, className: 'sigCanvas'}} />
                                <i class="material-icons-outlined" style={{fontSize: '1rem'}} onClick={clearSensitiveConsentSig}>clear</i>
                            </div> 
                        </div>
                        </div> */}
                <div className='pt-5'>
                    <h3>Covid-19 Risk Management</h3>
                    <p className='pt-2'>
                        Masks are no longer required to be worn by either the RMT or patient during the treatment session. However, if you would like to request that Cip de Vries, RMT wears a mask during the treatment, please notify him before the treatment.
                    </p>
                    <p>
                        If you are exhbiting any symptoms of Covid-19 such as fever, new onset of cough, worsening chronic cough, shortness of breath, decrease or loss of sense of taste or smell, chills, headaches, unexplained fatigue, malaise, or muscle aches, please do not come to your appointment and text Cip de Vries at 416-258-1230 to reschedule your appointment.
                    </p>
                </div>
                {/* add a checkbox for user to agree that they have read what to expect for their massage (clothes, payment, etc) */}
                </div>
                <button className='btn_register mt-5'  type="submit">Confirm Appointment</button>
            </form>
        </div>
    )
}

export default TreatmentConfirmationForm;
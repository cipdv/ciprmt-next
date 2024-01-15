import React from 'react';
import TreatmentConfirmationForm from './TreatmentConfirmationForm';

// Time formatting function
const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const UpcomingAppointments = ({ treatments }) => {
    const treatmentsWithoutConsent = treatments.filter(treatment => treatment.consents.treatmentConsent === false);
    const upcomingTreatment = treatments.find(treatment => {
      const treatmentDateTime = new Date(`${treatment.date}T${treatment.time}:00`);
      return treatmentDateTime > new Date() && treatment.consents.treatmentConsent === true;
    });
  
    return (
      <div className='pt-5'>
        {treatmentsWithoutConsent.map(treatment => {
          const treatmentDateTime = new Date(`${treatment.date}T${treatment.time}:00`);
          const strTime = formatTime(treatmentDateTime);
          return (
            <div key={treatment._id}>
              <TreatmentConfirmationForm
                treatmentId={treatment._id} 
                treatment={treatment} 
                treatmentDateTime={treatmentDateTime} 
                currentDateTime={new Date()}
                strTime={strTime}
              />            
            </div>
          );
        })}
  
        {upcomingTreatment ? (
          <div key={upcomingTreatment.id}>
            <h1>Upcoming Appointments:</h1>
            <h2>Your upcoming appointment is scheduled for {upcomingTreatment.date} at {formatTime(new Date(`${upcomingTreatment.date}T${upcomingTreatment.time}:00`))}</h2>
          </div>
        ) : (
          <div>
            <h1>Upcoming Appointments:</h1>
            <p>You have no upcoming appointments.</p>
            <p>To schedule an appointment, text Cip at 416-258-1230.</p>
          </div>
        )}
      </div>
    );
  };

export default UpcomingAppointments;

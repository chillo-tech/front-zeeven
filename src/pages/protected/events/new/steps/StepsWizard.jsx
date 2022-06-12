import {useContext} from 'react'
import {NewEventContext} from '../../../../../context/EventContext'
import EventDay from './EventDay';
import FinalStep from './FinalStep';
import UserInfos from './UserInfos';

function StepsWizard() {

    const {state: {step, event}, updateStep, updateContact, updateDates} = useContext(NewEventContext);
    const nextFormStep = () => {
      const newStepIndex = Math.min(step + 1, 3);
      updateStep(newStepIndex);
    };

    const prevFormStep = () => {
      let newStepIndex = Math.max(step - 1, 0);
      updateStep(newStepIndex);
    }
    
    const handleUserInfos = (profile) => {
      updateContact(profile);
      nextFormStep();
    }

    const handleDaysInfos = (dates) => {
      updateDates(dates);
      nextFormStep();
    }
    
    const fieldWrapper = (() => {
        switch (step) {
            case 1:
                return <UserInfos prevFormStep={prevFormStep} defaultValues={event.contacts[1]}
                                  nextFormStep={handleUserInfos} title="Avec" adjective='Son'/>;
            case 2:
                return <EventDay prevFormStep={prevFormStep} nextFormStep={handleDaysInfos}/>;
            case 3:
                return <FinalStep/>;
            default:
              return <UserInfos nextFormStep={handleUserInfos} defaultValues={event.contacts[0]}
                                title="Je me marie"/>;
        }
    })();
    return (
        <div className='bg-white p-5 rounded-xl text-blue-800'>
            {fieldWrapper}
        </div>
    )
}

export default StepsWizard

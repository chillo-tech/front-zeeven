import { MouseEventHandler, useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { NewEventContext } from '../../context';
import fr from 'date-fns/locale/fr';
import { DayClickEventHandler, DayPicker } from 'react-day-picker';
type Params = {
  prevFormStep?: MouseEventHandler, 
  nextFormStep?: any, 
}
function EventDay({prevFormStep, nextFormStep}: Params) {

  const today = new Date();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    const dayIndex = selectedDays.findIndex((selectedDay) => {
      const selectedDayAsDate = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())
      const dayAsDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      return dayAsDate.getTime() === selectedDayAsDate.getTime();
    });

    if (dayIndex === -1) {
      setSelectedDays([...selectedDays, day]);
    }

    if (dayIndex > -1 && modifiers.selected) {
      const current = [...selectedDays]
      current.splice(dayIndex, 1);
      setSelectedDays(current);
    }
  };
  const goToNextStep = ()=> {
    nextFormStep(selectedDays);
  }

	return (
		<>
		    <h2 className='font-nunito text-2xl text-blue-800'>Veuillez sélectionner une date</h2>
        <div className="text-md">
          <DayPicker
            mode="multiple"
            min={1}
            onDayClick={handleDayClick}
            selected={selectedDays}
            locale={fr}
            fromDate={today}
          />
        </div>
        {
          prevFormStep ? 
          <div className="flex py-2">
            <button onClick={prevFormStep} type="button" className="mr-2 w-full border border-blue-800 hover:border-blue-800 text-blue-800 font-light py-2 px-4 rounded-lg shadow-sm">Retour</button>
            <button onClick={goToNextStep} type="button" className="ml-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">Continuer</button>
          </div> : 
          <button onClick={goToNextStep} type="button" className="mt-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">Continuer</button>
        }
		</>
	);
}

export default EventDay;

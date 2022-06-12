
import React from 'react'
import { useNavigate } from "react-router-dom";
import DateDisplay from '../../../../components/date-display/DateDisplay';

function EventItem({event}) {
  const navigate = useNavigate();
  const display = () => {
    navigate(`/evenements/${event.id}`, { replace: true });
  }
  
  return (
    <article className='border border-gray-300 bg-white p-4 rounded-xl my-4 flex flex-col md:flex-row justify-between items-center'>
      <div>
        <h2 className='color text-gray-600 font-semibold text-lg font-nunito '>{event.name}</h2>
       
        {
          event.dates ? 
          <div className="flex flex-col md:flex-row mt-3 mr-1">{event.dates.map((date, index) => <span className='mr-1'><DateDisplay entry={date} key={index} /></span>)} </div>
            : null
          }
        
      </div>
      <div className="flex py-2 justify-center">
        <button onClick={display} type="button" className="border border-blue-800 hover:text-white hover:bg-blue-800 text-blue-800 font-light py-2 px-4 rounded-lg shadow-sm">
          Afficher
        </button>
      </div>
    </article>
  )
}

export default EventItem;

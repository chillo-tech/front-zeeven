import React, {useEffect,useContext, useState, useCallback} from 'react'
import { SecurityContext } from '../../../../context';
import EventItem from './EventItem';

function EventList() {
  const {protectedAxios} = useContext(SecurityContext);
  const [events, setEvents] = useState([]);
  const readData = useCallback(
    async () => {
      try {
        const {data} = await protectedAxios.get('event');
        setEvents(data);
      } catch (error) {
      }
    },
  [])
  useEffect(() => {
    readData();
  }, [readData])
  return (
    <section className='py-10'>
        <h2 className='font-nunito text-2xl text-blue-800'>
          Vos evènements
        </h2>
        <div className="">
          {events.map((event) => <EventItem key={event.slug} event={event} />)}
        
        </div>
    </section>
  )
}

export default EventList;
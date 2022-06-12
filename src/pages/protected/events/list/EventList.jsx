import React, {useEffect, useState, useCallback} from 'react'
import {AuthenticatedApiClient} from '../../../../services'
import EventItem from './EventItem';

function EventList() {
  const [events, setEvents] = useState([]);
  const readData = useCallback(
    async () => {
      try {
        const apiClient = AuthenticatedApiClient();
        const {data} = await apiClient.get('event');
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
          {events.map(event => <EventItem key={event.id} event={event} />)}
        
        </div>
    </section>
  )
}

export default EventList;
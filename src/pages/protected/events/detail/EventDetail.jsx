import {useCallback, useEffect,useState} from 'react'
import {AuthenticatedApiClient} from '../../../../services';
import DateDisplay from '../../../../components/date-display/DateDisplay';
import {Tabs} from '../../../../components/Tabs/Index';
import { useParams } from "react-router-dom";
import Guests from '../../../../components/guests/Guests';
import Schedules from '../../../../components/schedule/Schedules';
function EventDetail() {

  const {slug} = useParams();
  const [event, setEvent] = useState({dates:[]});
  const readData = useCallback(
    async () => {
      try {
        const apiClient = AuthenticatedApiClient();
        const {data} = await apiClient.get(`event/${slug}`);
        setEvent(data);
      } catch (error) {
      }
    },
  [slug])
  useEffect(() => {
    readData();
  }, [readData])
  return (
    <>
        <article className='border border-gray-300 bg-white p-3 rounded-xl my-4'>
          <h2 className='color text-gray-600 font-semibold text-lg font-nunito text-center md:text-left'>{event.name}</h2>
          {
            event.dates ? 
            (
              <div className="flex my-1 flex-col md:flex-row ">
                {event.dates.map((day, index) => <span className='md:mr-2 text-center my-1 md:my-0 text-gray-500 text-md' key={index}><DateDisplay entry={day} /></span>)}
              </div>
            )
            : null 
          }
        </article>
        <Tabs.Group aria-label="Tabs with icons">
          <Tabs.Item title="Invités">
            <Guests />
          </Tabs.Item>
          <Tabs.Item title="Programme">
            <Schedules dates={event.dates}/>
          </Tabs.Item>
        </Tabs.Group>
      </>
  )
}

export default EventDetail;

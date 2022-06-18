import {useContext, useCallback, useEffect,useState} from 'react'
import DateDisplay from '../../../../components/date-display/DateDisplay';
import {Tabs} from '../../../../components/Tabs/Index';
import { useParams, useNavigate } from "react-router-dom";
import Guests from '../../../../components/guests/Guests';
import Schedules from '../../../../components/schedule/Schedules';
import { SecurityContext } from '../../../../context';
function EventDetail() {

  const {protectedAxios} = useContext(SecurityContext);
  const {slug} = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({dates:[]});
  const readData = useCallback(
    async () => {
      try {
        const id = slug.substring(slug.lastIndexOf('-') +1)
        const {data} = await protectedAxios.get(`event/${id}`);
        setEvent(data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            navigate(`/page-inconnue`, { replace: true });
          }
        }
      }
    },
  [slug, protectedAxios])
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
        <Tabs.Group aria-label="Tabs with icons" style="fullWidth">
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

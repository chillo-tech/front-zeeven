import React, {useContext, useEffect, useState, useCallback} from 'react'
import  {PlusCircleOutlined} from '@ant-design/icons';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';
import { useParams } from "react-router-dom";
import { SecurityContext } from '../../context';

function Schedules({dates}) {
  const {protectedAxios} = useContext(SecurityContext);
  const {slug} = useParams();
  const [schedules, setSchedules] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  
  const fetchSchedules = useCallback(async () => {
    try {
      const id = slug.substring(slug.lastIndexOf('-') +1)
      const {data} = await protectedAxios.get(`event/${id}/schedule`);
      setSchedules(data);
    } catch (error) {
    }
  }, [slug, protectedAxios])

  const onSubmit = async (profile) => {
    setFormVisible(false);
    try {
      const id = slug.substring(slug.lastIndexOf('-') +1)
      await protectedAxios.post(`event/${id}/schedule`, JSON.stringify(profile));
      fetchSchedules();
    } catch (error) {
    }
  };

  useEffect(()=>{
    fetchSchedules();
  }, [fetchSchedules])
  return (
    <article className='flex flex-col p-3'>
      <div className="border-b-2 border-blue-500 flex justify-between items-center py-2 my-2">
        <span className='text-blue-800'>
          Votre programme
        </span>
        <button type='button' className='text-blue-800' onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? <span>Annuler</span> : (<PlusCircleOutlined className='text-xl text-blue-800'/>)}
        </button>
      </div>
      {formVisible ? <ScheduleEdit dates={dates} handleSubmit={onSubmit} /> : null }
      {schedules.length ? <ScheduleList schedules={schedules} dates={dates} /> : null }
    </article>
  )
}

export default Schedules
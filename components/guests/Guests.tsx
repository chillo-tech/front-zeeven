import React, {useEffect, useState, useCallback} from 'react'
import  {UserAddOutlined} from '@ant-design/icons';
import GuestEdit from './GuestEdit';
import { Profile } from '../../context/event-data';
import { useRouter } from 'next/router';
import AuthenticatedApiClient from '../../services/axios/AuthenticatedApiClient';
import GuestList from './GuestList';

function Guests() {
  const {query: {id = ''}} = useRouter();
  const [guests, setGuests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  
  const fetchGuests = useCallback(async () => {
    try {
      const apiClient = AuthenticatedApiClient();
      const {data} = await apiClient.get(`event/${id[0]}/guest`);
      setGuests(data);
    } catch (error) {
    }
  }, [id])

  const onSubmit = async (profile: Profile) => {
    setFormVisible(false);
    try {
      const apiClient = AuthenticatedApiClient();
      await apiClient.post(`event/${id[0]}/guest`, JSON.stringify(profile));
      fetchGuests();
    } catch (error) {
    }
  };

  useEffect(()=>{
    fetchGuests();
  }, [fetchGuests])
  return (
    <article className='flex flex-col'>
      <div className="border-b-2 border-blue-500 flex justify-between items-center py-2 my-2">
        <span className='text-2xl text-blue-800'>
          Vos invités ({guests.length})
        </span>
        <button type='button' onClick={() => setFormVisible(!formVisible)}>
          <UserAddOutlined className='text-4xl text-blue-800'/>
        </button>
      </div>
      {formVisible ? <GuestEdit handleSubmit={onSubmit} /> : null }
      {guests.length ? <GuestList guests={guests} /> : null }
    </article>
  )
}

export default Guests
import React, {useEffect, useState, useCallback} from 'react'
import  {UserAddOutlined} from '@ant-design/icons';
import GuestEdit from './GuestEdit';
import {AuthenticatedApiClient} from '../../services';
import GuestList from './GuestList';
import { useParams } from "react-router-dom";

function Guests() {
  const {slug} = useParams();
  const [guests, setGuests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  
  const fetchGuests = useCallback(async () => {
    try {
      const apiClient = AuthenticatedApiClient();
      const {data} = await apiClient.get(`event/${slug}/guest`);
      setGuests(data);
    } catch (error) {
    }
  }, [slug])

  const onSubmit = async (profile) => {
    setFormVisible(false);
    try {
      const apiClient = AuthenticatedApiClient();
      await apiClient.post(`event/${slug}/guest`, JSON.stringify(profile));
      fetchGuests();
    } catch (error) {
    }
  };

  useEffect(()=>{
    fetchGuests();
  }, [fetchGuests])
  return (
    <article className='flex flex-col p-3'>
      <div className="border-b-2 border-blue-500 flex justify-between items-center py-2 my-2">
        <span className='text-blue-800'>
          Vos invités ({guests.length})
        </span>
        <button type='button' onClick={() => setFormVisible(!formVisible)}>
          <UserAddOutlined className='text-2xl text-blue-800'/>
        </button>
      </div>
      {formVisible ? <GuestEdit handleSubmit={onSubmit} /> : null }
      {guests.length ? <GuestList guests={guests} /> : null }
    </article>
  )
}

export default Guests
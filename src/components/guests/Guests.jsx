import React, {useEffect, useState, useCallback, useContext} from 'react'
import  {UserAddOutlined} from '@ant-design/icons';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';
import { useParams } from "react-router-dom";
import { SecurityContext } from '../../context';

function Guests() {
  const {protectedAxios} = useContext(SecurityContext);
  const {slug} = useParams();
  const [guests, setGuests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  
  const fetchGuests = useCallback(async () => {
    try {
      const id = slug.substring(slug.lastIndexOf('-') +1)
      const {data} = await protectedAxios.get(`event/${id}/guest`);
      setGuests(data);
    } catch (error) {
    }
  }, [slug,protectedAxios])

  const onSubmit = async (profile) => {
    setFormVisible(false);
    try {

      const id = slug.substring(slug.lastIndexOf('-') +1)
      await protectedAxios.post(`event/${id}/guest`, JSON.stringify(profile));
      fetchGuests();
    } catch (error) {
    }
  };

  const handleDelete = async ({id:guestId}) => {
    setFormVisible(false);
    try {
      const id = slug.substring(slug.lastIndexOf('-') +1)
      await protectedAxios.delete(`event/${id}/guest/${guestId}`);
      fetchGuests();
    } catch (error) {
    }
  };
  const sendInvitations = async (ids) => {
      try {
        const id = slug.substring(slug.lastIndexOf('-') +1);
        await protectedAxios.post(`event/${id}/invitations`, ids);
      } catch (error) {
      }
  }
  useEffect(()=>{
    fetchGuests();
  }, [fetchGuests])
  return (
    <article className='flex flex-col p-3'>
      <div className="border-b-2 border-blue-500 flex justify-between items-center py-2 my-2">
        <span className='text-blue-800'>
          Vos invités ({guests.length})
        </span>
        <button type='button' className='text-blue-800' onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? <span>Annuler</span> : (<UserAddOutlined className='text-2xl text-blue-800'/>)}
        </button>
      </div>
      {formVisible ? <GuestEdit handleSubmit={onSubmit} /> : null }
      {guests.length ? <GuestList guests={guests} handleDelete={handleDelete} sendGuestsInvitations={sendInvitations}/> : null }
    </article>
  )
}

export default Guests
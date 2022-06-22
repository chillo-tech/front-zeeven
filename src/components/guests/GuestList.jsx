import React, {useState} from 'react'
import  {DeleteOutlined, SendOutlined} from '@ant-design/icons';

function GuestList({guests, handleDelete, sendGuestsInvitations}) {
  const [error, setError] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([])
  const deleteGuest = ({id})=>{
    handleDelete({id});
  }

  const sendInvitations = async () => {
    if(selectedGuests.length === 0) {
      setError(true);
    } else {
      sendGuestsInvitations(selectedGuests);
      setSelectedGuests([]);
    }
  }

  const toggleList = ({target: {id, checked}}) => {
    setError(false);
    if (checked) {
      setSelectedGuests([...selectedGuests, id]);
    } else {
      const guestsToKeep = selectedGuests.filter((guestId) => id !== guestId);
      setSelectedGuests(guestsToKeep);
    }
  }
  return (
    <div className='grid gap-2 grid-cols-1'>
      {error ? <p className='text-red-600 text-center'>Veuillez sélectionner des invités</p> : null }
       {
          guests.map(
            (guest, index) => (
              <label 
                htmlFor={guest.profile.publicId} 
                key={guest.profile.publicId} 
                onChange={toggleList}
                className="border border-slate-300 rounded bg-slate-100 grid grid-row-6 md:grid-cols-12 text-center items-center justify-center"
              >
                <p className='text-center align-middle py-3'>
                   <input 
                    type='checkbox' 
                    id={guest.profile.publicId} 
                    value={guest.profile.publicId} 
                    checked={selectedGuests.indexOf(guest.profile.publicId) > -1}
                  />
                </p>
                <p className='text-center capitalize'>
                  {guest.profile.civility === 'MR' ? 'Mr' : null}
                  {guest.profile.civility === 'MRS' ? 'Mme' : null}
                  {guest.profile.civility === 'MR_MRS' ? 'Mr & Mme' : null}
                </p>
                <p className='md:col-span-4 text-blue-800 font-extrabold'>
                  <span className='capitalize mr-1 font-bold'>
                    {guest.profile.firstName}
                  </span>
                  <span className='uppercase font-bold'>
                    {guest.profile.lastName}
                  </span>
                </p>
                <p className='md:col-span-3'>
                  {guest.profile.email}
                </p>
                <p className='md:col-span-2'>
                  {guest.profile.phone}
                </p>
                <button
                  type='button' 
                  className='block w-full z-50 py-3 md:py-0' 
                  onClick={()=>deleteGuest({id: guest.profile.publicId})} 
                > 
                    <DeleteOutlined className='text-red-600' />
                </button>
              </label>
            )
          )
        }
        <div className='text-center'>
            <button
                  type='button' 
                  className='flex items-center justify-between mx-auto z-50 border border-blue-700 bg-blue-700 text-white text-lg rounded-full py-1 px-4' 
                  onClick={sendInvitations} 
                > 
                    <SendOutlined className='text-white' /> <span className='ml-3'>Envoyer</span>
                </button>
        </div>
    </div>
  )
}

export default GuestList
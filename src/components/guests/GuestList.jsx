import React from 'react'
import  {DeleteOutlined} from '@ant-design/icons';

function GuestList({guests}) {
  return (
    <div className='grid gap-4 grid-cols-1'>
       {
          guests.map(
            (guest, index) => (
              <label key={index} className="border border-slate-300 rounded bg-slate-100 grid grid-row-6 md:grid-cols-12 text-center items-center justify-center">
                <p className='text-center align-middle py-3'>
                   <input type='checkbox' />
                </p>
                <p className='text-center capitalize'>
                  {guest.profile.civility}
                </p>
                <p className='py-1 md:col-span-4 text-blue-800 font-extrabold'>
                  <span className='capitalize mr-1 font-bold'>
                    {guest.profile.firstName}
                  </span>
                  <span className='uppercase font-bold'>
                    {guest.profile.lastName}
                  </span>
                </p>
                <p className='py-1 md:col-span-3'>
                  {guest.profile.email}
                </p>
                <p className='py-1 md:col-span-2'>
                  {guest.profile.phone}
                </p>
                <p className='py-3'>
                  <button type='button' className='block w-full py-1'> 
                    <DeleteOutlined className='text-red-600' />
                  </button>
                </p>
              </label>
            )
          )
        }
    </div>
  )
}

export default GuestList
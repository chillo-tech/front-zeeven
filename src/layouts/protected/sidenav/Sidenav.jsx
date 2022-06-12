import Link from 'next/link'
import React from 'react'

function Sidenav() {
  return (
    <aside className='bg-slate-100 shadow-lg shadow-gray-500/50 col-span-2'>
       <Link href='/'>
        <a className='text-center font-nunito text-4xl text-blue-800 py-2 px-3 block'>ZEEVEN</a>
      </Link>
    </aside>
  )
}

export default Sidenav
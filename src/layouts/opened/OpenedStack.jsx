import React from 'react'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignIn from '../../pages/opened/SignIn';


function OpenedStack() {
  return (
    <section
			className='opened-stack w-full min-h-screen bg-blue-800 text-white flex flex-col justify-center text-xl font-light'>
			<main
				className='text-xl font-light px-auto'>
				<div className="mx-auto w-11/12 md:3/4 lg:w-1/3 py-2 md:px-0">
          <li className='block my-1 text-center font-nunito text-7xl'>
            <Link to='/'>ZEEVEN</Link>
          </li>
          <Routes>
            <Route path="connexion" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/connexion" replace={true} />} />
          </Routes>
				</div>
			</main>
		</section>
  )
}

export default OpenedStack
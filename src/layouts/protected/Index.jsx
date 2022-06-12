import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Account } from '../../pages/protected/account/Account';
import Header from './header/Header';
import Footer from './footer/Footer';
import NewEvent from '../../pages/protected/events/new/NewEvent';


function ProtectedStack() {
  return (
    <section className='font-extralight border min-h-screen bg-slate-200 flex flex-col justify-between font-roboto'>
      <Header />
      <section className='mx-auto py-3 w-10/12 md:3/4 2xl:w-2/4 md:px-0'>
        <Routes>
            <Route path="/mon-compte" element={<Account />} />
            <Route path="/creer-evenement" element={<NewEvent />} />
          <Route path="*" element={<Navigate to="/mon-compte" replace={true} />} />
        </Routes>
      </section>
      <Footer />
    </section>
  )
}

export default ProtectedStack
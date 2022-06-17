import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Header from './header/Header';
import Footer from './footer/Footer';
import NewEvent from '../../pages/protected/events/new/NewEvent';
import EventList from '../../pages/protected/events/list/EventList';
import EventDetail from '../../pages/protected/events/detail/EventDetail';


function ProtectedStack() {
    return (
        <section className='font-extralight border min-h-screen bg-slate-200 flex flex-col justify-between font-roboto'>
            <Header/>
            <section className='mx-auto py-3 w-11/12 md:3/4 2xl:w-2/4 md:px-0'>
                <Routes>
                    <Route path="/mon-compte" element={<EventList/>}/>
                    <Route path="/creer-evenement" element={<NewEvent/>}/>
                    <Route path="/evenements/:slug" element={<EventDetail/>}/>
                    <Route path="*" element={<Navigate to="/mon-compte" replace={true}/>}/>
                </Routes>
            </section>
            <Footer/>
        </section>
    )
}

export default ProtectedStack

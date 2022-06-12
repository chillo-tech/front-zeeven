import React from 'react';
import  {LogoutOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../../hooks';
function Header() {
  const {userInfos:{firstName}, signOut} = useUser();
  let navigate = useNavigate();
  
  const closeSession = async() => {
    signOut();
    navigate("/", { replace: true });
  }

  const createNewEvent = () => {
    //resetEvent();
    navigate("/creer-evenement", { replace: true });
  }

  return (
    <header className='bg-slate-100 shadow-lg shadow-gray-500/50 flex justify-between py-2 px-2 md:px-4 items-center border-b border-blue-800'>
      <span className='text-center font-nunito text-2xl md:text-4xl text-blue-800 py-2 block'>
        <Link to='/'>ZEEVEN</Link>
      </span>
      <button type='button' onClick={createNewEvent} className='text-lg text-center text-slate-100  bg-blue-800 py-2 px-3 rounded-lg font-light flex items-center'>
        <PlusCircleOutlined/>
        <span className='ml-2 hidden md:block'> Créer mon évènement</span>
        <span className='ml-2 md:hidden'> Créer</span>
      </button>
      <div className='flex justify-center items-center text-xl'>
        <span className='hidden md:block text-blue-800'><span className='capitalize px-2'>{firstName}</span></span>
        <button type='button' className='mb-1' onClick={closeSession}> 
          <LogoutOutlined style={{fontSize: '1.2em', color: 'rgb(30, 64, 175)'}}/>
        </button>
      </div>
    </header>
  );
}
 
export default Header;

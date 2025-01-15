import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slice/authSlice';
import Sidebar from './Sidebar';
import AddQuestion from './AddQuestion';
import ManageQuestions from './ManageQuestions';
import PassMarkSetting from './PassMarkSetting';



function AdminPanel() {
    const [activeComponent, setActiveComponent] = useState('add-question');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    
    useEffect(() => {
      console.log(user)
    
      if (!user) {
        
        navigate('/admin/login');
      }
    }, [navigate]);

    const renderContent = () => {
        switch (activeComponent) {
          case "add-question":
            return <AddQuestion />;
          case "manage-questions":
            return <ManageQuestions />;
          case "pass-mark":
            return <PassMarkSetting/>;
          default:
            return <AddQuestion />;
        }
      };

    const handleLogout = () => {
        dispatch(logout)
        navigate('/admin/login')
    }
  return (
    
         <div className="admin-panel flex  gap-[10rem]">
          <div className='sidebar bg-primary h-screen p-10 justify-center ' >
            <a href='/'><h3 className='text-2xl text-white my-2 text-center'>Quiz <strong className='text-accent'>App</strong></h3></a>
          <Sidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
          <button onClick={handleLogout} className='my-3 bg-accent py-2 px-5 rounded-2xl text-white font-semibold mx-5 flex items-end'>Logout</button>
          </div>
    
      <div className="admin-content w-[70%] ">{renderContent()}</div>
     
    </div>
       
    
  )
}

export default AdminPanel
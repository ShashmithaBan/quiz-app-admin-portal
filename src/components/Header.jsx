import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/admin/login')
    }

  return (
    <div className='header flex  justify-between mx-[5rem] items-center'>
       <a href='/'><h3 className='text-2xl text-black my-2'>Quiz <strong className='text-accent'>App</strong></h3></a>
        <button onClick={handleLogin} className='my-3 bg-accent py-2 px-5 rounded-2xl text-white font-semibold mx-5 flex items-end'>login</button>
    </div>
  )
}

export default Header
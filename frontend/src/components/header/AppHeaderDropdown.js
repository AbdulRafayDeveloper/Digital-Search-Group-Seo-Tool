/* eslint-disable prettier/prettier */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Remove the token from local storage
      localStorage.removeItem('token');

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Your Account Logout",
      });

      navigate('/auth/login');
    }
  };

  return (
    <>
      <button onClick={handleLogout} className='text-center text-white rounded-full w-20 h-9 bg-[#4B0082] font-bold'>Logout</button>
    </>
  )
}

export default AppHeaderDropdown
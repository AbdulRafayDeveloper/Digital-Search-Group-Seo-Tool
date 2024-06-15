/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from '@coreui/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Frontend validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required',
      })
      return
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid email format',
      })
      return
    }

    // If all validations pass, proceed with the API call
    const formData = {
      email,
      password,
    }

    const token = localStorage.getItem('token');
    if (token) {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/logout`, { token: token })
        .then((result) => {
          if (result.data.status === 200) {
            // Remove the token from local storage
            localStorage.removeItem('token');
          }
        })
        .catch((error) => {
          // Handle error if necessary
          console.error('Error occurred:', error);
        });
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/user/login`, formData)
      .then((response) => {
        if (response.data.status === 200) {
          if (response.data.token) {
            // Store the token in local storage
            localStorage.setItem('token', response.data.token);
          }
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          })
          if (response.data.data.role === 0) {
            navigate('/admin/dashboard')
            window.location.href = "/admin/dashboard";
          }
          else if (response.data.data.role === 1) {
            navigate('/home')
            window.location.href = "/home";
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response ? error.response.data.message : 'An error occurred',
        })
      })
  }

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-500 to-purple-400 min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup className='rounded-2xl'>
              <CCard className="p-4 xl:rounded-2xl lg:rounded-2xl md:rounded-none sm:rounded-none w-full">
                <CCardBody>
                  <CForm method="post" onSubmit={handleSubmit} className="grid gap-3 mx-24">
                    <h1 className="text-4xl font-bold">Log in</h1>
                    <p className="text-medium-emphasis text-xl">Log in below if you have an account</p>
                    <div className="relative rounded-full overflow-hidden mt-3">
                      {/* Icon */}
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5zm1 1a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V6a.5.5 0 00-.5-.5H3zM9 10a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {/* Input field */}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="Email"
                        className="block text-medium w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>


                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                        style={{ flex: 1 }} // Add this style to make the input field fill available space
                      />
                      <CInputGroupText
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        style={{ cursor: 'pointer' }}
                      >
                        <CIcon icon={showPassword ? cilEyedropper : cilEyedropper} />
                      </CInputGroupText>
                    </CInputGroup> */}

                    <div className="relative overflow-hidden mb-4">
                      {/* Icon */}
                      <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                          {/* Eye icon */}
                          {showPassword ? (
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M9.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          )}
                        </svg>
                      </div>
                      {/* Input field */}
                      <input
                        type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {/* Eye icon */}
                      <div
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.39 14.36a10 10 0 01-5.39 5.39" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M4.22 4.22l15.56 15.56" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M17.6 17.6l-4.6-4.6m-2.8 2.8l-4.6-4.6m9.2 9.2l-4.6-4.6" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <CRow className="justify-content-center">
                      <CCol xs={12} sm={6} className='text-align-center'>
                        <CButton
                          type="submit"
                          className="text-center text-xl rounded-full w-48 h-12 active:text-white bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0082] hover:text-[#4B0082] hover:bg-white"
                        >
                          Log in
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 rounded-2xl hidden lg:block" 
                style={{ width: '100%', backgroundColor: '#4B0082' }}
              >
                <CCardBody className="rounded-full mx-8">
                  <div className='rounded-full'>
                    <h2 className='text-4xl font-bold'>Welcome to Digital Search</h2>
                    <p className='text-xl mt-10 font-medium'>
                      We are a leading Digital Search Company dedicated to enhancing online visibility through SEO services. Our expert team focuses on optimizing websites to drive growth, expand audience reach, and boost business success. Let us help you achieve your goals with tailored SEO strategies and dedicated support.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
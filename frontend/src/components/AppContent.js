/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types'

// routes config
import routes from '../routes'
// Function to check if the user has a valid role
const hasValidRole = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwt_decode(token)
    return decoded.role === 0 // Adjust role check as needed
  }
  return false
}

// PrivateRoute for protecting routes
const PrivateRoute = ({ element }) => {
  return hasValidRole() ? element : <Navigate to="/auth/login" replace />
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
}

// The AppContent component with corrected Routes structure
const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="#4B0082" />}>
        <Routes>
          {routes.map((route, idx) => (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  <PrivateRoute element={<route.element />} />
                } // Use PrivateRoute as the element
              />
            )
          ))}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
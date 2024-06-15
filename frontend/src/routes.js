/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// Admin Panel Pages //
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomersList = React.lazy(() => import('./views/customer/list/CustomersList'))
const KeywordsList = React.lazy(() => import('./views/customer/list/KeywordsList'))
const AddSector = React.lazy(() => import('./views/Sectors/add/AddSector'))
const SectorsList = React.lazy(() => import('./views/Sectors/list/SectorsList'))
const UpdateSector = React.lazy(() => import('./views/Sectors/update/UpdateSector'))
const AddService = React.lazy(() => import('./views/Services/add/AddService'))
const ServicesList = React.lazy(() => import('./views/Services/list/ServicesList'))
const UpdateService = React.lazy(() => import('./views/Services/update/UpdateService'))

const token = localStorage.getItem('token');
let validRoleForAdmin = false;

if (token) {
  const decoded = jwt_decode(token);
  if (decoded.role === 0) {
    validRoleForAdmin = true;
  }
}

const routes = [
  { path: '/admin/dashboard', element: validRoleForAdmin ? (Dashboard) : (<Navigate to="/auth/login" replace />), exact: true },
  { path: '/customer/list', element: validRoleForAdmin ? (CustomersList) : (<Navigate to="/auth/login" replace />), name: 'Customers List', exact: true },
  { path: '/customer/keywords/list/:id', element: validRoleForAdmin ? (KeywordsList) : (<Navigate to="/auth/login" replace />), name: 'Keywords List', exact: true },
  { path: '/sector/add', element: validRoleForAdmin ? (AddSector) : (<Navigate to="/auth/login" replace />), name: 'Add Sector', exact: true },
  { path: '/sector/list', element: validRoleForAdmin ? (SectorsList) : (<Navigate to="/auth/login" replace />), name: 'Sectors List', exact: true },
  { path: '/sector/update/:id', element: validRoleForAdmin ? (UpdateSector) : (<Navigate to="/auth/login" replace />), name: 'Update Sector', exact: true },
  { path: '/services/add/:id', element: validRoleForAdmin ? (AddService) : (<Navigate to="/auth/login" replace />), name: 'Add Services', exact: true },
  { path: '/services/list', element: validRoleForAdmin ? (ServicesList) : (<Navigate to="/auth/login" replace />), name: 'Services List', exact: true },
  { path: '/services/update/:id', element: validRoleForAdmin ? (UpdateService) : (<Navigate to="/auth/login" replace />), name: 'Update Services', exact: true },
]

export default routes;
/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilStorage,
  cilShareBoxed,
  cilSpeedometer,
  // cilStar,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Customers',
    to: '/customer/list',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Sector',
  },
  {
    component: CNavItem,
    name: 'New Sector',
    to: '/sector/add',
    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Sectors',
    to: '/sector/list',
    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Services',
  },
  {
    component: CNavItem,
    name: 'List of Services',
    to: '/services/list',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
]

export default _nav
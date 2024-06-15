/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './App.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Home = React.lazy(() => import('./views/frontPages/homepage'))
const About = React.lazy(() => import('./views/frontPages/About/aboutPage'))
const Contact = React.lazy(() => import('./views/frontPages/Contact/contactPage'))

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/home" name="Home Page" element={<Home />} exact={true} />
              <Route path="/about" name="About Page" element={<About />} exact={true} />
              <Route path="/contact" name="Contact Page" element={<Contact />} exact={true} />
              <Route path="/404" name="Page 404" element={<Home />} exact={true} />
              <Route path="/500" name="Page 500" element={<Home />} exact={true} />
              <Route path="/auth/login" name="Login Page" element={<Login />} />
              <Route path="*" element={<DefaultLayout />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
    )
  }
}

export default App
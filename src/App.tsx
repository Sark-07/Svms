import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './shared/Layout'
import Auth from './auth/Auth'
import Error404 from './pages/Error/Error404'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import StampRequisition from './pages/StampRequisition/StampRequisition'
import Home from './pages/Home/Home'

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new-stamp-requisition" element={<StampRequisition />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
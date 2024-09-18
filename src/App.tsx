import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './shared/Layout'
import Auth from './auth/Auth'
import Error404 from './pages/Error/Error404'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import StampRequisition from './pages/StampRequisition/StampRequisition'

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/new-stamp-requisition' element={<StampRequisition/>}/>
        </Route>
          <Route path="auth" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
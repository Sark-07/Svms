
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './shared/Layout'
import Auth from './auth/Auth'
import Error404 from './pages/Error/Error404'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import StampRequisition from './pages/StampRequisition/StampRequisition'
import Home from './pages/Home/Home'
import StampRequisionHistory from './pages/StampRequisionHistory/StampRequisionHistory'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://svms-bgrm.vercel.app/">
          <Route index element={<Home />} />
          <Route path="https://svms-bgrm.vercel.app/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new-stamp-requisition" element={<StampRequisition />} />
            <Route path="stamp-requisition-history" element={<StampRequisionHistory />} />
          </Route>
          <Route path="https://svms-bgrm.vercel.app/auth" element={<Auth />}>
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
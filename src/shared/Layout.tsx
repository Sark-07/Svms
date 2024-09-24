
import Footer from './Footer'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'



const Layout = () => {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <Sidebar />
      <div className='w-[calc(100%-5rem)] ml-auto min-h-screen flex flex-col'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </main>
  )
}

export default Layout
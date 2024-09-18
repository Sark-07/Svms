import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SidebarDialog from './SidebarDialog'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

type Props = {}

const Layout = (props: Props) => {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <Sidebar />
      <div className='w-[calc(100%-5rem)] ml-auto'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </main>
  )
}

export default Layout
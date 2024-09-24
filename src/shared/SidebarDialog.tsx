import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'



const SidebarDialog = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`fixed top-0 left-0 z-10 w-72 h-screen bg-white shadow-md transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between py-4 px-6 border">
        <h1 className='text-2xl font-bold font-ethnocentric bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text'>SVMS</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <ul className="mt-8">
        {
          [
            { path: '/requisition', label: 'Stamp Requisition' },
            { path: '/requisition-history', label: 'Stamp Requisition History' },
            { path: '/payments', label: 'Payments' },
            { path: '/profile', label: 'Profile' },
          ].map((item) => (
            <li key={item.path} className="py-4 px-6 hover:bg-gray-100">
              <Link to={item.path} className="text-gray-800 font-medium hover:text-gray-900">
                {item.label}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SidebarDialog

import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <Link to={'/'}><h1 className='text-3xl font-bold font-ethnocentric bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text'>SVMS</h1></Link>
        <ul className="flex items-center">
          <li className="mr-6"><a href="#" className="hover:text-gray-900">Home</a></li>
          <li className="mr-6"><a href="#" className="hover:text-gray-900">About</a></li>
          <li className="mr-6"><a href="#" className="hover:text-gray-900">Contact</a></li>
        </ul>
      <div className="relative">
        <img src="https://via.placeholder.com/50" alt="User DP" className="w-10 h-10 rounded-full" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 hover:opacity-50 transition-opacity duration-300" />
      </div>
      </div>
    </nav>
  )
}

export default Navbar
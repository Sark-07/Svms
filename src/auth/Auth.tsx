
import { Link, Outlet } from 'react-router-dom'


const Auth = () => {
    return (
        <div className="w-full lg:grid h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center py-12 h-full relative">
                <Link to={'/'}><h1 className='absolute top-4 left-10 text-3xl font-bold font-ethnocentric bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text'>SVMS</h1></Link>
                <Outlet />
            </div>
            <div className="hidden bg-muted lg:block">
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                    <h2 className="text-4xl font-bold mb-6">Stamp Vendor Management System</h2>
                    <p className="text-xl mb-8 text-center">Streamline your vendor relationships and optimize your supply chain</p>
                    <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
                        <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Vendor Onboarding</h3>
                            <p>Efficiently onboard new vendors with our streamlined process</p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Performance Tracking</h3>
                            <p>Monitor and evaluate vendor performance with real-time analytics</p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Contract Management</h3>
                            <p>Centralize and manage all vendor contracts in one secure location</p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Risk Assessment</h3>
                            <p>Identify and mitigate potential risks associated with your vendors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
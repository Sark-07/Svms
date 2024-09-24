



const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-8">Oops! Page not found</p>
      <p className="text-md md:text-lg text-gray-500 dark:text-gray-500 mb-8 text-center">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out">
        Go Home
      </a>
    </div>
  )
}

export default Error404
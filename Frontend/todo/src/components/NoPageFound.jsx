import React from 'react'

function NoPageFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
  
      <h1 className="text-5xl font-bold text-blue-600">404</h1> 
      <p className="text-xl text-gray-700 mt-2 mb-6">Oops! Page Not Found</p>
      <a
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
    </>
  )
}

export default NoPageFound
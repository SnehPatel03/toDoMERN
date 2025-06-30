import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'


function Signin() {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  
  const handleRegister = async (e) => {
    localStorage.clear()
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/user/signin", {
        username,
        email, password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(data.message || "User registration Successfully ")
      console.log(data.data.token)
      localStorage.setItem("jwt",data.data.token)
      setUsername("")
      setPassword("")
      setEmail("")
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message || "user registration failed")
    }
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign In</h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your Email"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-5 text-sm">
            Already registered?

            <Link className='ml-1 font-semibold hover:text-blue-700 text-blue-500' to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      );


    </>
  )
}

export default Signin
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/user/login", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      toast.success(data.message || "user Logged in Successfully")
      localStorage.setItem("jwt", data.data.user.token)
      setEmail("")
      setPassword("")
      navigateTo("/")
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message || "User Login failed")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Welcome Back..!</h2>

        <form onSubmit={loginHandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
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
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-5 text-sm">
          Don't have an account yet?
          <Link to="/signin" className="text-blue-600 font-medium hover:text-blue-800 duration-300 ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Login;
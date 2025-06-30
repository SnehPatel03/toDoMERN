import './App.css'
import Home from './components/Home'
import NoPageFound from './components/NoPageFound'
import { Routes, Route } from "react-router-dom"
import Signin from './components/Signin'
import Login from './components/Login'
import toast, { Toaster } from 'react-hot-toast';



function App() {
  const token = localStorage.getItem("jwt")
  return (
    <>
      <Routes>
        <Route path='/' element={<Home  />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
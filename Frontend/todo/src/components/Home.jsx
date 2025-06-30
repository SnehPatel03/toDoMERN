import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true)
        const responce = await axios.get("http://localhost:3000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
        setTodos(responce.data.todos)

      } catch (error) {
        setError("There is Error in Fetching a Todo")
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchtodos();
  }, [])
  const createTodo = async () => {
    if (!newTodo) return
    try {
      const responce = await axios.post('http://localhost:3000/todo/create', {
        text: newTodo,
        completed: false
      }, {
        withCredentials: true
      })
      console.log(responce.data)
      setTodos([...todos, responce.data.newTodo])
      console.log(todos)
      setNewTodo("");

    } catch (error) {
      setError("There is Error in Creating a Todo") ////
      console.log(error)
    }
  }

  const updateStatus = async (id) => {
    const todo = todos.find((t) => t._id == id)
    try {
      const responce = await axios.put(`http://localhost:3000/todo/update/${id}`, {
        ...todo,
        completed: !todo.completed
      }, {
        withCredentials: true
      })
      setTodos(todos.map((t) => t._id == id ? responce.data.updatedTodo : t))

    } catch (error) {
      setError("There is Error in updateing status a Todo")
      console.log(error)
    }
  }
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
        withCredentials: true
      })
      setTodos(todos.filter((t) => t._id !== id))
    } catch (error) {
      setError("There is Error in deleteing a Todo")
      console.log(error)
    }
  }

  const loggedOut = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout")
      toast.success("User Logged Out Successfully")
      navigateTo("/login")
      localStorage.removeItem("jwt")
    } catch (error) {
      setError("There is Error in LoggedOut ")
      toast.error("There Error in LogOut ")
      console.log(error)
    }
  }
  const remaining = todos.filter((t) => !t.completed).length;
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-500'>
      <div className='h-[80vh] w-[40vw] rounded-[30px] bg-gray-200 flex items-center flex-col py-10 px-7  relative'>

        <h1 className='text-3xl uppercase font-bold '>Todo List</h1>
        <div className=' w-[100%]  flex items-center justify-center mt-7'>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createTodo()}
            type="text" className='h-10  px-2 py-1 border-1 rounded-sm font-semibold w-[80%]' placeholder='Enter Your Todo Here' />

          <button
            onClick={createTodo}
            className=' ml-3 py-2 px-6 bg-blue-500 font-semibold uppercase border-1 rounded-sm'>
            Add
          </button>
        </div>
        {loading ? (<div className='h-full w-full  flex justify-center items-center '><h1 className='text-xl font-bold text-gray-700'>Loading....</h1></div>) : error ? (<div className='h-full w-full flex justify-center items-center'><h1 className='text-xl font-bold text-red-700'>{error}</h1></div>) : (<div className='w-[91.5%] h-[55vh] mt-4  rounded-md py-4 px-4 overflow-x-auto'>
          <ul className='space-y-2'>
            {todos.map((todo, index) => (<li key={todo._id || index} className='flex item-center justify-between bg-gray-300 rounded-lg'>
              <div className='ml-5 flex items-center '>
                <input type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateStatus(todo._id)}
                  className='text-xl mr-3' />
                <span className={`${todo.completed ? "line-through text-grey-800 font-semibold " : "text-grey-800 font-semibold"}`}>{todo.text} </span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className='text-white font-semibold  h-[6vh] bg-red-700 hover:bg-red-800 duration-300 px-3 py-1 rounded-r-lg'>Delete</button>
            </li>))}
          </ul>
        </div>)}

        <div onClick={loggedOut} className='absolute  bottom-15 flex flex-col'>
          <p className='text-lg font-semibold text-gray-800 '>{remaining} Todo remaining</p>
          <button className='px-4 text-white font-bold py-2 mt-4 bg-red-600 rounded-md  hover:bg-red-800 duration-300'>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Home;
import { useEffect, useState } from "react"
import CreateTask from "./Component/CreateTask";
import ListTasks from "./Component/ListTasks";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [tasks, setTasks] = useState([]);
  console.log('tasks', tasks)
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("loggedin")
    localStorage.removeItem("user")
    navigate("/login")
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 w-screen min-h-screen flex flex-col items-center pt-4 overflow-x-hidden" >
      <div className='w-[80%] h-[70px]  '>
        <h1 className='text-center text-xl font-bold uppercase text-cyan-500'>Welcome - {user.name}</h1>
        <h1 className='text-center text-md text-gray-600 font-bold uppercase'>Position - {user.position}</h1>
        <div className='w-full flex justify-center mt-5'>
          <button className='md:absolute  right-10  bg-cyan-500 text-white pb-2 pt-1 px-3  rounded-md' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div
       className="flex flex-col items-center pt-20 ">

        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
      </div>
    </DndProvider>
  )
}

export default App
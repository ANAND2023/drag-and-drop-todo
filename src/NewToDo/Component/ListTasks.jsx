import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import toast from 'react-hot-toast'
import { MdEdit } from "react-icons/md";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([])
  const [completed, setCompleted] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if (!tasks) return;
    console.log("tasks", tasks)
    const onlyLoggedToDo = tasks.filter((task) => task.status === "todo");
    const fTodos = onlyLoggedToDo.filter((item) => {
      return item.email === user.email;
    })
    const fcompleted = tasks.filter((task) => task.status === "completed");
    console.log('fTodos', fTodos)
    setTodos(fTodos)
    setCompleted(fcompleted)

  }, [tasks])

  const statuses = ["todo",
    "completed"]
  return (
    <div className=' w-full flex justify-between md:gap-16  mt-10'>
      {
        statuses.map((status, index) => (
          <Section key={index} status={status} tasks={tasks} setTasks={setTasks}
            todos={todos}
            completed={completed}
          />))
      }
    </div>
  )
}

export default ListTasks


const Section = ({ status, tasks, setTasks, todos,
  completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSelection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  let text = "Todo";
  let bg = 'bg-slate-500';
  let tasksToMap = todos;


  if (status === 'completed') {
    text = "Completed";
    bg = 'bg-green-500';
    tasksToMap = completed;
  }
  const addItemToSelection = (id) => {
    setTasks((preV) => {
      if (!Array.isArray(preV)) {
        // If preV is not an array, return an empty array
        console.error("preV is not an array:", preV);
        return [];
      }

      const mTasks = preV.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task Status Changed");
      return mTasks;
    });
  };
  return (
    <div ref={drop} className={`md:w-64 w-full  p-2 ${isOver ? "bg-slate-200" : ""}`}>

      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 && tasksToMap.map((task) => (
        <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  )
}


const Header = ({ text, bg, count }) => {
  return (
    <div className='w-full '>
      <div className={`${bg} flex  h-12 pl-4 items-center  rounded-md uppercase text-sm text-white px-3`}>
        {text}
        <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex justify-center items-center'>
          {count}
        </div>
      </div>
    </div>
  )
}


const Task = ({ task, tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  // console.log("isDragging", isDragging)
  const handleRemove = (id) => {
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    const fTasks = tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task removed");
    setShowConfirmation(false);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(task.name);
    toast("Task Not Update")
  };
  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, name: editedName };
      }
      return t
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast("Task updated");
    setIsEditing(false);
  };
  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-2 shadow-md rounded-md bg-gray-200 cursor-grab w-full  group hover:bg-gray-300
       ${isDragging ? "opacity-25" : "opacity-100"}
       `}>
      {
        isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md space-y-2">
              <input className='border-2 border-slate-400 rounded-md mr-4 h-12 w-64 px-1' type="text" value={editedName} onChange={handleInputChange} />
              <button className='bg-cyan-500 rounded-md px-4 h-12 text-white mr-2 ' onClick={handleSaveEdit}>Save</button>
              <button className='bg-gray-600 rounded-md px-4 h-12 text-white' onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        )
      }

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 z-50 rounded-md ">
            <p>Are you sure you want to remove this task?</p>
            <div className="flex justify-center mt-4 ">
              <button className=" text-white px-4 py-2 mr-2 bg-red-600 rounded-md" onClick={confirmRemove}>
                Confirm
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={cancelRemove}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500  cursor-pointer">
        <thead className="text-xs text-gray-700 uppercase   gap-1">
          <tr className=''>
            <th scope="col" className=" ">
              {task.name}
            </th>
          </tr>
        </thead>

      </table>
      <div className='absolute bottom-1 right-1 invisible group-hover:visible '>

        <button className=' text-blue-400'
          onClick={() => handleEdit(task.id)}
        >

          <MdEdit className='md:text-2xl text-xl' />
        </button>
        <button className=' text-red-600'
          onClick={() => handleRemove(task.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>)
}
'use client'
import React, { useState } from 'react'
import Header from './components/page'

const page = () => {
  const [task, setTask] = useState('')
  const [desc, setDesc] = useState('')
  const [mainTask, setMainTask] = useState([])

  const deleteHandler = (i) => {
    let copyTask = [...mainTask]
    copyTask.splice(i, 1)
    setMainTask(copyTask)
  };

  const toggleComplete = (i) => {
    let updatedTasks = [...mainTask]
    updatedTasks[i].completed = !updatedTasks[i].completed
    setMainTask(updatedTasks)
  };

  const handleTask = (e) => {
    e.preventDefault()
    if (task && desc) {
      setMainTask([...mainTask, { task, desc, completed: false }])
      setTask('')
      setDesc('')
    }
  };

  const renderTask = mainTask.length > 0 ? (
    mainTask.map((t, i) => (
      <li key={i} className="mb-4">
        <div className="flex justify-between items-center p-2 border-b border-gray-300">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={t.completed} 
              onChange={() => toggleComplete(i)} 
              className="w-4 h-4"
            />
            <div className={t.completed ? 'line-through text-gray-500' : ''}>
              <h5 className="font-bold text-black">{t.task}</h5>
              <h6 className="text-gray-700">{t.desc}</h6>
            </div>
          </div>
          <button 
            onClick={() => deleteHandler(i)} 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs md:text-sm"
          >
            Delete
          </button>
        </div>
      </li>
    ))
  ) : (
    <h2 className="text-gray-500 italic">No Tasks...</h2>
  );

  return (
    <div className="p-5">
      <Header />
      <form onSubmit={handleTask} className="space-y-4 mb-6">
        <input 
          type="text" 
          placeholder="Enter a task" 
          className="w-full border rounded border-gray-400 px-4 py-2"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter the description" 
          className="w-full border rounded border-gray-400 px-4 py-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button 
          type="submit" 
          className="w-full rounded bg-black text-white py-2 text-lg hover:bg-gray-800 transition"
        >
          Add a Task
        </button>
      </form>
      <div>
        <h2 className="font-bold text-lg mb-2">Tasks</h2>
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  );
};

export default page;

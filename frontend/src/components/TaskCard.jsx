import React from 'react'
import { FaCheckCircle, FaCircle, FaTrash } from 'react-icons/fa'

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 flex items-start justify-between transition duration-300 hover:shadow-lg border-l-4 ${
      task.completed ? 'border-green-500 bg-green-50' : 'border-indigo-500'
    }`}>
      <div className="flex items-start gap-4 flex-1">
        <button 
          onClick={() => onToggle(task)}
          className="mt-1 text-2xl flex-shrink-0 focus:outline-none transition"
        >
          {task.completed ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaCircle className="text-gray-400 hover:text-indigo-500" />
          )}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-lg transition ${
            task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(task)}
        className="ml-3 p-2 hover:bg-red-100 text-red-500 rounded-lg transition flex-shrink-0"
        title="Delete task"
      >
        <FaTrash className="text-lg" />
      </button>
    </div>
  )
}

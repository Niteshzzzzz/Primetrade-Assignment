import React, { useEffect, useState } from 'react'
import api from '../services/api.js'
import TaskCard from '../components/TaskCard.jsx'
import SkeletonLoader from '../components/SkeletonLoader.jsx'
import { validateTaskForm } from '../utils/validators.js'
import { FaPlus, FaCheckDouble } from 'react-icons/fa'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/tasks')
      setTasks(data)
    } catch (error) {
      console.error('Error loading tasks:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    // Validate form
    const { isValid, errors: validationErrors } = validateTaskForm(title, description)
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    try {
      setSubmitting(true)
      const { data } = await api.post('/tasks', { 
        title: title.trim(), 
        description: description.trim() 
      })
      setTasks(prev => [data, ...prev])
      setTitle('')
      setDescription('')
      setSuccessMessage('Task added successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.[0]?.message || 
                       error.response?.data?.message || 
                       'Failed to create task'
      setErrors({ submit: errorMsg })
    } finally {
      setSubmitting(false)
    }
  }

  const toggle = async (task) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { completed: !task.completed })
      setTasks(prev => prev.map(t => t._id === data._id ? data : t))
    } catch (error) {
      console.error('Error toggling task:', error.message)
    }
  }

  const remove = async (task) => {
    try {
      await api.delete(`/tasks/${task._id}`)
      setTasks(prev => prev.filter(t => t._id !== task._id))
    } catch (error) {
      console.error('Error deleting task:', error.message)
    }
  }

  const completedCount = tasks.filter(t => t.completed).length

  if (loading) {
    return <SkeletonLoader />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <FaCheckDouble className="text-indigo-600" />
          My Tasks
        </h2>
        {completedCount > 0 && (
          <p className="text-gray-600 mt-2">
            Progress: <span className="font-semibold text-indigo-600">{completedCount}/{tasks.length}</span> completed
          </p>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-sm">
          ✓ {successMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={create} className="mb-8 p-6 bg-white rounded-lg shadow-md border border-indigo-100">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <FaPlus className="text-indigo-600" />
          Add New Task
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
            <input 
              value={title} 
              onChange={e => {
                setTitle(e.target.value)
                if (errors.title) setErrors(prev => ({ ...prev, title: '' }))
              }} 
              placeholder="What needs to be done?" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={submitting}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">⚠ {errors.title}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input 
              value={description} 
              onChange={e => {
                setDescription(e.target.value)
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }))
              }} 
              placeholder="Add more details (optional)" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={submitting}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">⚠ {errors.description}</p>}
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg md:col-span-1 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-semibold flex items-center justify-center gap-2 self-end"
          >
            <FaPlus /> {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>

        {/* Character counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs text-gray-600">
          <p>Title: <span className={title.length > 180 ? 'text-red-500 font-semibold' : ''}>{title.length}/200</span></p>
          <p>Description: <span className={description.length > 900 ? 'text-red-500 font-semibold' : ''}>{description.length}/1000</span></p>
        </div>

        {/* Submit error */}
        {errors.submit && (
          <p className="text-red-500 text-sm mt-4 p-2 bg-red-50 rounded">⚠ {errors.submit}</p>
        )}
      </form>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FaCheckDouble className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing <span className="font-semibold">{tasks.length}</span> task{tasks.length !== 1 ? 's' : ''}
            </div>
            {tasks.map(t => (
              <TaskCard key={t._id} task={t} onToggle={toggle} onDelete={remove} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

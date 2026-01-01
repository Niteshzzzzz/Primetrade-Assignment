import React, { useEffect, useState, useMemo } from 'react'
import api from '../services/api.js'
import TaskCard from '../components/TaskCard.jsx'
import SkeletonLoader from '../components/SkeletonLoader.jsx'
import { validateTaskForm } from '../utils/validators.js'
import { FaPlus, FaCheckDouble, FaSearch, FaTimes } from 'react-icons/fa'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'oldest', 'title'

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

  // Filter, search, and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      )
    }

    // Apply status filter
    if (filterStatus === 'active') {
      result = result.filter(task => !task.completed)
    } else if (filterStatus === 'completed') {
      result = result.filter(task => task.completed)
    }

    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [tasks, searchQuery, filterStatus, sortBy])

  const completedCount = tasks.filter(t => t.completed).length
  const activeCount = tasks.filter(t => !t.completed).length

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
        {tasks.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
            <p>
              Total: <span className="font-semibold text-gray-900">{tasks.length}</span>
            </p>
            <p>
              Active: <span className="font-semibold text-indigo-600">{activeCount}</span>
            </p>
            <p>
              Completed: <span className="font-semibold text-green-600">{completedCount}</span>
            </p>
          </div>
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

      {/* Search and Filter Section */}
      {tasks.length > 0 && (
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {/* Status Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'active'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'completed'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FaCheckDouble className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tasks found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterStatus('all')
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredAndSortedTasks.length}</span> of <span className="font-semibold">{tasks.length}</span> task{tasks.length !== 1 ? 's' : ''}
            </div>
            {filteredAndSortedTasks.map(t => (
              <TaskCard key={t._id} task={t} onToggle={toggle} onDelete={remove} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

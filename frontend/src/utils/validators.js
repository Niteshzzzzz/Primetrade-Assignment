export function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}

export function getEmailError(email) {
  if (!email || email.trim().length === 0) {
    return 'Email is required'
  }
  if (!validateEmail(email)) {
    return 'Invalid email address'
  }
  return ''
}

export function validatePassword(pw) {
  return pw && pw.length >= 6
}

export function getPasswordError(password) {
  if (!password || password.length === 0) {
    return 'Password is required'
  }
  if (password.length < 6) {
    return `Password must be at least 6 characters (${password.length}/6)`
  }
  return ''
}

export function validateTaskTitle(title) {
  const trimmed = title?.trim() || ''
  return trimmed.length > 0 && trimmed.length <= 200
}

export function validateTaskDescription(description) {
  const desc = description?.trim() || ''
  return desc.length === 0 || desc.length <= 1000
}

export function validateTaskForm(title, description) {
  const errors = {}
  
  if (!title || title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (title.trim().length > 200) {
    errors.title = 'Title must be less than 200 characters'
  }
  
  if (description && description.trim().length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
  }
  
  return { isValid: Object.keys(errors).length === 0, errors }
}

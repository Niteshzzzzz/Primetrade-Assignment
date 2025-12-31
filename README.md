# TaskManager - A Full-Stack Task Management Application

A modern, responsive task management application built with React and Node.js/Express. Manage your tasks efficiently with a clean and intuitive interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Authentication & Security
- ✅ Secure JWT authentication with httpOnly cookies
- ✅ User registration and login
- ✅ Password validation (minimum 6 characters)
- ✅ Protected routes and API endpoints
- ✅ Session management with automatic authentication check

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Task descriptions with character limits
- ✅ Progress tracking (completed/total tasks)
- ✅ Real-time task updates

### Frontend Features
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Icon-rich interface with react-icons
- ✅ Form validation with helpful error messages
- ✅ Loading states and skeleton loaders
- ✅ Full-page preloader on app startup
- ✅ Success/error notifications
- ✅ Mobile-friendly design
- ✅ Professional landing page

### Backend Features
- ✅ Input validation using Zod
- ✅ Secure CORS configuration
- ✅ Environment variable management (.env)
- ✅ MongoDB integration with Mongoose
- ✅ Morgan request logging
- ✅ Error handling middleware
- ✅ RESTful API architecture

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **Bcryptjs** - Password hashing
- **Zod** - Input validation
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (running locally or connection string)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assignment-
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Create `.env` file
```bash
cp .env.example .env
```

#### Configure `.env`
Edit `.env` with your actual values:
```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://admin:admin@127.0.0.1:27017/myapp?authSource=admin

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

#### Start backend server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Create `.env` file
```bash
cp .env.example .env
```

#### Configure `.env`
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Task Manager App
VITE_APP_VERSION=1.0.0
```

#### Start frontend dev server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
assignment-/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── config/
│   │   │   ├── db.js             # MongoDB connection
│   │   │   └── env.js            # Environment variables
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── task.controller.js
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── task.routes.js
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── validations/
│   │       ├── auth.validation.js
│   │       └── task.validation.js
│   ├── server.js
│   ├── package.json
│   ├── .env                       # Environment variables (not in git)
│   ├── .env.example              # Example env file
│   ├── .gitignore
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Preloader.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── config/
│   │   │   └── env.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── validators.js
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   ├── .env                       # Environment variables (not in git)
│   ├── .env.example              # Example env file
│   ├── .gitignore
│   └── index.html
│
└── README.md                       # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get current user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (Protected)
- `POST /api/tasks` - Create a new task (Protected)
- `GET /api/tasks/:id` - Get a specific task (Protected)
- `PUT /api/tasks/:id` - Update a task (Protected)
- `DELETE /api/tasks/:id` - Delete a task (Protected)

## 📝 Validation Rules

### Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: Minimum 6 characters

### Login
- Email: Valid email format
- Password: Required

### Task Creation/Update
- Title: 1-200 characters
- Description: 0-1000 characters (optional)
- Completed: Boolean (optional)

## 🔐 Security Features

- ✅ httpOnly cookies for JWT storage (XSS protection)
- ✅ Password hashing with bcryptjs
- ✅ CORS configuration with credentials
- ✅ Input validation with Zod
- ✅ Protected API routes with JWT middleware
- ✅ Environment variables for sensitive data
- ✅ Secure flag for cookies in production

## 🚢 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

### Run Backend in Production
```bash
cd backend
NODE_ENV=production npm start
```

## 📚 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify username and password

### Frontend Blank Page
- Clear browser cache
- Check console for errors
- Ensure backend is running

### CORS Errors
- Verify `CLIENT_URL` in backend `.env`
- Verify `VITE_API_URL` in frontend `.env`
- Check proxy configuration in `vite.config.js`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: `npm run dev -- --port 5174`

## 📖 Usage

1. **Visit the Application**
   - Open `http://localhost:5173`

2. **Create an Account**
   - Click "Register" on landing page
   - Fill in name, email, and password
   - Click "Register"

3. **Login**
   - Enter email and password
   - Click "Login"

4. **Manage Tasks**
   - Add tasks with title and optional description
   - Click the circle icon to mark tasks complete
   - Click trash icon to delete tasks
   - View progress in the header

5. **View Profile**
   - Click profile button in navbar
   - View user information and account status

6. **Logout**
   - Click "Logout" in navbar
   - You'll be redirected to login page

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for efficient task management

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy Task Managing! 🎉**

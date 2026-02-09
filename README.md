# HRMS Lite

## 1. Project Overview
HRMS Lite is a lightweight Human Resource Management System designed for small organizations. It provides a simple, efficient way to manage employee records and track daily attendance. The application is built with a focus on clean, modular code and a professional user interface.

## Key Highlights
- **Full Stack Architecture:** Built using the MERN stack (MongoDB, Express, React, Node.js).
- **Clean UI/UX:** Minimalist design for ease of use by administrative staff.
- **RESTful API:** Structured backend endpoints for scalable data management.
- **Real-time Updates:** Immediate feedback on UI after data operations.

## 2. Features

### Employee Management
- **Add Employee:** Register new employees with ID, Name, Email, and Department.
- **List Employees:** View a comprehensive list of all registered employees.
- **Delete Employee:** Remove employee records when no longer needed.
- **Validations:** Prevents duplicate Employee IDs and ensures valid email formats.

### Attendance Management
- **Mark Attendance:** Record daily attendance (Present/Absent) for employees.
- **View History:** Check attendance records for any specific employee.
- **Prevention:** Ensures only one attendance record per employee per day.

## 3. Tech Stack
- **Frontend:** React (Vite), React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Styling:** CSS Modules / Vanilla CSS

## 4. Live URLs
- **Frontend:** https://hrms-lite-frontend-theta.vercel.app
- **Backend:** [Add your Render URL here]

## 5. Local Setup

### Prerequisites
Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - You have two options:
  - **Local Installation:** [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - **Cloud Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **npm** (comes with Node.js)

### Backend Setup
1. Navigate to the root directory:
   ```bash
   cd hrms-lite
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hrms-lite
   ```
4. **Make sure MongoDB is running** on your system (required for the backend to start)
   
5. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on **http://localhost:5000**

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on **http://localhost:5173**

### Quick Start (Both Servers)
To run the complete application, you need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd hrms-lite
npm start
```

**Terminal 2 - Frontend:**
```bash
cd hrms-lite/frontend
npm run dev
```

Then open your browser and navigate to **http://localhost:5173**

## 6. Environment Variables

### Backend (.env)
- `PORT`: The port the server runs on (default: 5000).
- `MONGO_URI`: The connection string for your MongoDB database.

### Frontend (frontend/.env)
- `VITE_API_URL`: The base URL for the backend API (e.g., `http://localhost:5000/api` or production URL).

## 7. Assumptions & Limitations
- **Single User:** The system is designed for a single admin user; there is no login/authentication system.
- **Data Deletion:** Deleting an employee does not automatically cascade delete their attendance records (kept for history).
- **Date Handling:** Dates are stored as strings (YYYY-MM-DD) for simplicity in this version.

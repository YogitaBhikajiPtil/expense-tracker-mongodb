# 💰 Expense Tracker

A full-stack **Expense Tracker** application that helps users record, manage, and monitor their daily expenses. The application provides a simple interface for adding expenses and organizing financial records efficiently.

---

## 🚀 Live Demo

Live Application:https://github.com/YogitaBhikajiPtil/expense-tracker-mongodb

---

## ✨ Features

* 👤 User registration and login
* 🔐 Secure authentication
* ➕ Add new expenses
* ✏️ Edit existing expenses
* 🗑️ Delete expenses
* 📋 View expense history
* 🏷️ Categorize expenses
* 💰 Track expense amounts
* 📅 Store expense dates
* 📊 View spending information
* 🔒 User-specific expense data
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* DOM Manipulation

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcrypt

### Tools

* Git
* GitHub
* npm

---

## 🏗️ Application Architecture

```text
                  ┌─────────────────┐
                  │      User       │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Frontend     │
                  │ HTML/CSS/JS     │
                  └────────┬────────┘
                           │
                       REST API
                           │
                           ▼
                  ┌─────────────────┐
                  │    Express.js   │
                  │     Backend     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Mongoose     │
                  │       ORM       │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │     MongoDB     │
                  └─────────────────┘
```

---

## 📁 Project Structure

```text
Expense-Tracker/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 API Modules

```text
/api/auth
/api/expenses
/api/users
```

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Expenses

```text
POST   /api/expenses
GET    /api/expenses
GET    /api/expenses/:id
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

**Never commit your `.env` file or database credentials to GitHub.**

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Expense-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your MongoDB connection string and JWT secret.

### 4. Start the server

```bash
npm start
```

For development:

```bash
npm run dev
```

### 5. Open the application

Open the frontend using a local development server such as VS Code Live Server.

---

## 🔄 Application Flow

```text
User Registration
       ↓
User Login
       ↓
JWT Authentication
       ↓
Access Protected Routes
       ↓
Add / View / Update / Delete Expenses
       ↓
Express.js API
       ↓
Mongoose
       ↓
MongoDB
```

---

## 🔒 Security

The application implements:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* User-specific expense records
* Environment variables for sensitive configuration
* Input validation

---

## 🧪 Testing

The application was tested for:

* User registration
* User login
* Authentication
* Adding expenses
* Updating expenses
* Deleting expenses
* Viewing expense history
* Protected API routes
* Database operations
* Invalid input handling
* Error handling

---

## 🎯 Project Highlights

* Built a complete full-stack expense management application.
* Developed RESTful APIs using **Node.js and Express.js**.
* Used **MongoDB and Mongoose** for NoSQL data management.
* Implemented secure authentication using **JWT and bcrypt**.
* Implemented complete **CRUD operations** for expenses.
* Designed user-specific expense management.
* Used environment variables to securely manage application configuration.

---

## 🚀 Future Enhancements

* 📊 Expense visualization using charts
* 📅 Monthly and yearly expense reports
* 💰 Budget management
* 🔔 Spending alerts
* 📈 Spending analytics
* 📥 Export expenses to CSV/PDF
* ☁️ Cloud deployment
* 📱 Progressive Web App support

---

## 👩‍💻 Author

**Yogita Patil**

B.Tech — Computer Science Engineering


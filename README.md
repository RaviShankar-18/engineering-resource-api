# Engineering Resource Management System - Backend

A RESTful API for managing engineering team assignments across projects, built with Node.js, Express, and MongoDB.

## 🚀 Live Demo
**Backend API:** https://engineering-resource-api.vercel.app/

## 📋 Overview
This backend system manages engineering resource allocation by tracking:
- Engineer profiles with skills and capacity
- Project requirements and timelines  
- Assignment allocation and capacity tracking
- Authentication with role-based access (Manager/Engineer)

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express-validator
- **Security:** bcryptjs, CORS, helmet
- **Deployment:** Vercel

## 📊 Database Schema

### User Schema
```javascript
{
  email: String (unique),
  name: String,
  password: String (hashed),
  role: 'engineer' | 'manager',
  // Engineer-specific fields
  skills: ['React', 'Node.js', 'Python'], // Array of strings
  seniority: 'junior' | 'mid' | 'senior',
  maxCapacity: Number, // 100 for full-time, 50 for part-time
  department: String
}
```

### Project Schema
```javascript
{
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  requiredSkills: [String],
  teamSize: Number,
  status: 'planning' | 'active' | 'completed',
  managerId: ObjectId (ref: User)
}
```

### Assignment Schema
```javascript
{
  engineerId: ObjectId (ref: User),
  projectId: ObjectId (ref: Project),
  allocationPercentage: Number, // 0-100
  startDate: Date,
  endDate: Date,
  role: String // 'Developer', 'Tech Lead', etc.
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Engineers
- `GET /api/engineers` - Get all engineers
- `GET /api/engineers/:id` - Get specific engineer
- `GET /api/engineers/:id/capacity` - Get engineer's current capacity
- `PUT /api/engineers/:id` - Update engineer profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (Manager only)
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project (Manager only)
- `DELETE /api/projects/:id` - Delete project (Manager only)

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create new assignment (Manager only)
- `GET /api/assignments/:id` - Get specific assignment
- `PUT /api/assignments/:id` - Update assignment (Manager only)
- `DELETE /api/assignments/:id` - Delete assignment (Manager only)
- `GET /api/assignments/engineer/:engineerId` - Get assignments for specific engineer

## 🧮 Key Business Logic

### Capacity Calculation
```javascript
// Calculate available capacity for an engineer
function getAvailableCapacity(engineerId) {
  const engineer = getEngineer(engineerId);
  const activeAssignments = getActiveAssignments(engineerId);
  const totalAllocated = activeAssignments.reduce(
    (sum, assignment) => sum + assignment.allocationPercentage, 0
  );
  return engineer.maxCapacity - totalAllocated;
}
```

### Skill Matching
```javascript
// Find engineers with required skills for a project
function findSuitableEngineers(project) {
  return engineers.filter(engineer =>
    project.requiredSkills.some(skill => 
      engineer.skills.includes(skill)
    )
  );
}
```

## 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Manager/Engineer)
- Protected routes with middleware validation
- Password hashing with bcryptjs

## 📁 Project Structure
```
ENGINEERING RESOURCE MANAGEMENT BACKEND/
├── controllers/         # Route handlers
│   ├── assignment.controller.js
│   ├── auth.controller.js
│   ├── engineer.controller.js
│   └── project.controller.js
├── db/                 # Database configuration
│   └── db.connect.js   # MongoDB connection
├── middleware/         # Custom middleware
│   └── auth.middleware.js  # JWT authentication
├── models/             # Mongoose schemas
│   ├── assignment.model.js
│   ├── project.model.js
│   └── user.model.js
├── routes/             # Express routes
│   ├── assignment.routes.js
│   ├── auth.routes.js
│   ├── engineer.routes.js
│   └── project.routes.js
├── seed/               # Sample data
│   └── seedData.js
├── .env                # Environment variables
├── .gitignore
├── index.js            # Server entry point
├── package-lock.json
├── package.json
├── README.md
└── vercel.json         # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/RaviShankar-18/engineering-resource-api.git
cd engineering-resource-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Database Seeding
To populate the database with sample data:
```bash
npm run seed
```

This creates:
- 4 Engineers with different skills and capacities
- 4 Projects with various requirements
- 8 Sample assignments
- Mix of full-time and part-time engineers

## 🧪 Sample Data Included
- **Engineers:** 
  - Full-time Senior React/Node.js Developer
  - Part-time Mid-level Python/Django Developer
  - Full-time Junior Frontend Developer
  - Full-time Senior Full-stack Developer

- **Projects:**
  - E-commerce Platform (React, Node.js)
  - Data Analytics Dashboard (Python, React)
  - Mobile App Backend (Node.js, MongoDB)
  - Legacy System Migration (Java, Python)

## 🔧 AI-Powered Development Approach

### AI Tools Used
- **Claude AI:** For backend development and code structure
- **ChatGPT:** For research and answering technical questions

### How AI Helped
**Claude AI:**
- Provided existing code patterns from my previous projects (Books Management API, Recipes API, ShopEasy API)
- Generated models, database connection, and routes following my established folder structure
- Created controllers and middleware maintaining consistency with my coding style
- Listed all API endpoints for easy Postman testing
- No extra packages or unnecessary code added - only what was requested

**ChatGPT:**
- Research assistance for technical concepts
- Answered specific implementation questions
- Provided clarification on MongoDB schema design

## 🔍 Key Features Implemented
- ✅ JWT-based authentication system
- ✅ Role-based access control (Manager/Engineer)
- ✅ Real-time capacity calculation
- ✅ Skill-based engineer matching
- ✅ Project lifecycle management
- ✅ Assignment CRUD operations
- ✅ Data validation and error handling
- ✅ RESTful API design
- ✅ MongoDB integration with proper indexing

## 🚀 Deployment
Deployed on Vercel with:
- Automatic deployments from GitHub
- Environment variables configured
- MongoDB Atlas integration
- CORS configured for frontend integration

## 📝 API Testing
Test the API endpoints using the live URL:

### Authentication Endpoints
```bash
POST https://engineering-resource-api.vercel.app/api/auth/register
POST https://engineering-resource-api.vercel.app/api/auth/login
GET https://engineering-resource-api.vercel.app/api/auth/profile
```

### Engineer Endpoints
```bash
GET https://engineering-resource-api.vercel.app/api/engineers
GET https://engineering-resource-api.vercel.app/api/engineers/:id
GET https://engineering-resource-api.vercel.app/api/engineers/:id/capacity
PUT https://engineering-resource-api.vercel.app/api/engineers/:id
```

### Project Endpoints
```bash
GET https://engineering-resource-api.vercel.app/api/projects
POST https://engineering-resource-api.vercel.app/api/projects
GET https://engineering-resource-api.vercel.app/api/projects/:id
PUT https://engineering-resource-api.vercel.app/api/projects/:id
DELETE https://engineering-resource-api.vercel.app/api/projects/:id
```

### Assignment Endpoints
```bash
GET https://engineering-resource-api.vercel.app/api/assignments
POST https://engineering-resource-api.vercel.app/api/assignments
GET https://engineering-resource-api.vercel.app/api/assignments/:id
PUT https://engineering-resource-api.vercel.app/api/assignments/:id
DELETE https://engineering-resource-api.vercel.app/api/assignments/:id
GET https://engineering-resource-api.vercel.app/api/assignments/engineer/:engineerId
```

## 🔄 API Ready for Frontend Integration
This backend API is ready to be consumed by any frontend application with:
- Complete RESTful endpoints
- JWT authentication system
- Role-based access control
- Real-time capacity calculations
- Comprehensive error handling



---

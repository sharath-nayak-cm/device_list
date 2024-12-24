# Device Management Application

## Overview
The Device Lab application is built using **Express.js** for the backend, with **Mongoose** as the database ODM to interact with a MongoDB database. The application manages users and devices, and utilizes **Passport.js** for authentication. The entire project is written in **TypeScript** for improved type safety and development experience.

---

## Features
- **User Management**: Supports user registration, login, and session management.
- **Device Management**: Allows storing and managing device details in the database.
- **Authentication**: Utilizes Passport.js for secure user authentication with session-based persistence.

---

## Technology Stack
- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Passport.js](https://www.passportjs.org/)
- **Language**: TypeScript

---

## Installation and Setup
### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd device-lab
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/device-lab
   SESSION_SECRET=your-secret-key
   ```

4. **Run the Application**:
   - **Development Mode**:
     ```bash
     npm run dev
     ```
   - **Production Mode**:
     ```bash
     npm run build
     npm start
     ```

5. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure
```
.
├── src
│   ├── config
│   │   └── passport.ts         # Passport configuration
│   ├── controllers
│   │   ├── userController.ts   # User-related logic
│   │   └── deviceController.ts # Device-related logic
│   ├── models
│   │   ├── User.ts             # User schema and model
│   │   └── Device.ts           # Device schema and model
│   ├── routes
│   │   ├── userRoutes.ts       # Routes for user operations
│   │   └── deviceRoutes.ts     # Routes for device operations
│   ├── app.ts                  # Express app instance
│   ├── server.ts               # Server entry point
│   └── utils
│       └── helpers.ts          # Utility functions
├── .env                        # Environment variables
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

---

## API Endpoints
### User Routes
| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| POST   | `/login`      | User login             |
| POST   | `/register`   | User registration      |
| GET    | `/logout`     | User logout            |
| GET    | `/dashboard`  | Protected dashboard    |

### Device Routes
| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| GET    | `/devices`    | Fetch all devices      |
| POST   | `/devices`    | Add a new device       |
| PUT    | `/devices/:id`| Update a device        |
| DELETE | `/devices/:id`| Delete a device        |

---

## Authentication Flow
1. **User Login**:
   - Validates username and password.
   - Generates a session and stores it using `express-session`.
   - `req.isAuthenticated()` used to protect routes.

2. **Session Management**:
   - Passport serializes the user into the session (`serializeUser`).
   - On subsequent requests, the session is deserialized to retrieve user data (`deserializeUser`).

3. **Logout**:
   - Session is destroyed, and cookies are cleared to log out the user.

---


## Future Improvements
- Add JWT-based authentication for RESTful APIs.
- Implement role-based access control (e.g., Admin, User).
- Enhance device data with more attributes and relationships.
- Add unit tests and integration tests.








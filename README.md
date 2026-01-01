# 🚀 QUIZ404 - Premium MERN Quiz App

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-success)

**QUIZ404** is a modern, high-performance quiz application built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium dark-themed UI, real-time score tracking, and a dynamic quiz interface designed to engage users.

## ✨ Features

-   **🔐 Secure Authentication**: Robust user signup and login using JWT and Bcrypt.
-   **📊 Interactive Dashboard**: View your progress, recent scores, and stats at a glance.
-   **🎮 Dynamic Quiz Interface**:
    -   Timer-based questions.
    -   Instant feedback on answers.
    -   Smooth animations using GSAP and AOS.
-   **🏆 Leaderboard**: Compete with other users for the top spot.
-   **🎨 Premium UI/UX**:
    -   Fully responsive design.
    -   Sleek dark mode aesthetic with TailwindCSS.
    -   Particle background effects.
-   **📱 Mobile Ready**: Optimized for all devices.

## 🛠️ Tech Stack

### **Frontend (Client)**
-   **React.js** (Vite) - Component-based UI.
-   **TailwindCSS** - Utility-first styling.
-   **GSAP & AOS** - Advanced animations and scroll effects.
-   **Axios** - API requests.
-   **React Router** - Navigation.

### **Backend (Server)**
-   **Node.js & Express.js** - RESTful API architecture.
-   **MongoDB & Mongoose** - NoSQL database and object modeling.
-   **JWT (JSON Web Tokens)** - Secure authentication.
-   **Bcrypt.js** - Password hashing.
-   **Nodemailer** - Email services (Contact form).

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   [Node.js](https://nodejs.org/) installed.
-   [MongoDB](https://www.mongodb.com/) installed or a MongoDB Atlas connection string.

### 1. Clone the Repository
```bash
git clone https://github.com/kunal2tudu/QUIZ404-MERN.git
cd QUIZ404-MERN
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Add other necessary variables
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the React development server:
```bash
npm run dev
```

### 4. Run the App
-   The **Server** runs on `http://localhost:5000`
-   The **Client** runs on `http://localhost:5173` (or the port shown in your terminal)


## 🐳 Running with Docker

You can run the entire application stack (Client, Server, MongoDB) using Docker Compose.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop).

### Steps
1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd quiz404
   ```

2. **Run the application**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Client: [http://localhost](http://localhost) (runs on port 80)
   - Server: [http://localhost:5000](http://localhost:5000)

4. **Stop the application**:
   ```bash
   docker-compose down
   ```

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📄 License
This project is licensed under the ISC License.
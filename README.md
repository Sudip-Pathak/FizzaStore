# FizzaStore 🛒

FizzaStore is a modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a Daraz-inspired frontend architecture with advanced AI capabilities, including built-in smart AI assistants (Gemini and Groq) to help users navigate, find products, and log specific product demands.

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** React.js (Bootstrapped with Vite)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI Enhancements:** Framer Motion (Animations), Lucide React (Icons), React Toastify / Sonner (Notifications)
- **SEO/Document Head:** React Helmet Async

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & BcryptJS (Password Hashing)
- **File Uploads:** Multer (Local Image Uploads)
- **Email Service:** Nodemailer
- **AI Integrations:** 
  - `@google/generative-ai` (Gemini-2.5-Flash)
  - `groq-sdk` (Llama-3.1-8b-Instant)

### **Dev Tools**
- **Concurrently:** For running both backend and frontend servers simultaneously.
- **Nodemon:** For automatic backend server restarts during development.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- API Keys for Google AI Studio (Gemini) and Groq.

---

## 🛠️ Installation & Setup

Follow these steps to get your development environment set up:

**1. Clone the repository**
```bash
git clone https://github.com/Sudip-Pathak/FizzaStore.git
cd FizzaStore
```

**2. Install Root & Backend Dependencies**
```bash
npm install
```

**3. Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

**4. Environment Variables Setup**
Create a `.env` file in the root directory (you can use `.env.sample` as a reference if available) and add the following configurations:

```env
# Database & Server
PORT=5051
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Email Automation (Nodemailer)
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password

# AI Assistants
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

---

## 💻 Running the Project

### Database Seeding
To populate your database with initial sample data (products, users), run:
```bash
npm run data:load
```
*Note: To destroy/clear the sample data, run `npm run data:destroy`*

### Start Development Servers
You can run both the Node backend server and the Vite frontend server simultaneously with a single command:
```bash
npm run dev
```
- The backend API will run on `http://localhost:5051` (or your defined PORT).
- The frontend client will run on `http://localhost:5173` (or the nearest available port allocated by Vite).

---

## 🤝 Contributing

We welcome contributions to FizzaStore! Follow these steps to contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally: `git clone https://github.com/your-username/FizzaStore.git`
3. **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`
4. **Make your changes** and commit them with descriptive messages.
5. **Push your branch** to your fork: `git push origin feature/your-feature-name`
6. **Open a Pull Request** to the `main` branch of the original repository.

### Development Guidelines:
- Ensure your code follows the existing style patterns (using Tailwind/DaisyUI for frontend components).
- Do not modify existing core backend routes unless resolving a specific issue.
- Test your changes locally before submitting a PR.

---

## 📄 License

This project is licensed under the **MIT License**.

# Voices Within 📝

**Voices Within** is a full-stack blogging platform where users can write, edit, and manage personal blogs securely — because every voice deserves to be heard.

---

## 🚀 Live Demo
🔗 [Voices Within is Live Here](https://voiceswithin-node-express.vercel.app)

---
## ✨ Features

- User registration & login (JWT-based authentication)
- Create, read, update, and delete blogs
- Only the blog creator can edit or delete their blog
- Responsive and minimal front-end
- Blog titles and authors shown on the homepage
- RESTful API integration
- Protected routes using middleware

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Cookies
- **Tools**: VS Code, Git, GitHub, Postman

---

## 📁 Folder Structure
voiceswithin-app/
├── backend/             # Node.js + Express backend
│   ├── controller/      # Route controllers
│   ├── middleware/      # Auth and error handlers
│   ├── model/           # Mongoose schemas
│   ├── routes/          # Route definitions
│   └── server.js        # Main entry point
│
├── frontend/            # Static frontend (HTML/CSS/JS)
│   ├── index.html       # Homepage
│   ├── login.html       # Login page
│   ├── signup.html      # Signup page
│   ├── blog.html        # Blog viewer
│   ├── form.html        # Blog creator/editor
│   └── js/              # JavaScript files
│
├── .gitignore
├── README.md
└── package.json


## 🚀 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/voiceswithin-app.git
   cd voiceswithin-app

2.	Install backend dependencies
    ```bash
  	cd backend
    npm install

4. Create .env file in /backend with:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT

6. Run the backend server
   ```bash
   npm start

8. Open the frontend
   Use Live Server (VS Code extension) or open frontend/index.html in your browser.


## 👤 Author

**Durgesh Chouksey**  
💻 B.Tech CSE Final Year Student<br>
🚀 Exploring full-stack development<br>
📍 [GitHub Profile](https://github.com/yourusername)

  

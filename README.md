# Linkr 🔗

> A modern social media web app where users can create, share, and interact with posts.

---

## ✨ Features

- 🔐 **Authentication** — Register & Login with JWT tokens
- 📝 **Posts** — Create, edit, and delete posts with images
- 💬 **Comments** — Comment on any post in real time
- 👤 **Profile** — View any user's profile and their posts
- 🏷️ **Tags** — Posts support tags for categorization
- 📱 **Responsive** — Fully mobile-friendly on all screen sizes
- ♾️ **Infinite Scroll** — Loads more posts as you scroll down

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure |
| CSS3 | Styling & Responsive Design |
| JavaScript (ES6+) | Logic & DOM Manipulation |
| Bootstrap 5 | UI Components |
| Axios | HTTP Requests |
| REST API | [Tarmeez Academy API](https://tarmeezacademy.com) |

---

## 📸 Pages

- **Home** — Feed with all posts and infinite scroll
- **Post Details** — Full post view with comments section
- **Profile** — User info, stats, and their posts

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/abdallluh11/Linkr.git
cd Linkr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Open in browser
Open `home.html` directly in your browser or use a live server extension.

---

## 📁 Project Structure

```
Linkr/
├── home.html           # Main feed page
├── postDetails.html    # Single post with comments
├── profile.html        # User profile page
├── style.css           # Global styles
├── mainLogic.js        # Shared logic (auth, alerts, loader)
├── homeScript.js       # Home page logic & infinite scroll
├── profileScripts.js   # Profile page logic
└── node_modules/       # Dependencies
```

---

## 🔌 API

This project uses the **Tarmeez Academy REST API**:

```
Base URL: https://tarmeezacademy.com/api/v1
```

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/login` | POST | User login |
| `/register` | POST | User registration |
| `/posts` | GET | Get all posts |
| `/posts/:id` | GET | Get single post |
| `/posts` | POST | Create new post |
| `/posts/:id` | PUT | Update post |
| `/posts/:id` | DELETE | Delete post |
| `/posts/:id/comments` | POST | Add comment |
| `/users/:id` | GET | Get user info |
| `/users/:id/posts` | GET | Get user's posts |

---

## 👨‍💻 Author

**Abdalluh Elsawy**  
[![GitHub](https://img.shields.io/badge/GitHub-abdallluh11-black?logo=github)](https://github.com/abdallluh11)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

# 🤖 AI Interview Battle Arena

AI Interview Battle Arena is a full-stack AI-powered interview preparation platform that allows users to compete against an AI in technical interviews. Users answer AI-generated interview questions, receive detailed evaluations, compare their performance with AI-generated answers, earn ranks, and track their improvement over time.

---

## 🚀 Features

### 👤 User Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing

### 🎯 AI Interview
- Generate interview questions based on:
  - Topic
  - Difficulty Level
  - Number of Questions
- AI-generated ideal answers
- Human-like interview experience

### ⚔️ Battle Arena
- User competes directly against AI
- Side-by-side answer comparison
- AI evaluates every response
- Winner decided for each question
- Overall battle result

### 📊 Performance Evaluation
- Question-wise scoring
- AI score comparison
- Strengths & Weaknesses
- Personalized AI Feedback
- Overall Interview Summary

### 🏆 Ranking System
- Bronze
- Silver
- Gold
- Platinum
- Diamond

Ranks are calculated based on interview performance.

### 📈 Dashboard
- Total Interviews
- Win/Loss Statistics
- Average Score
- Rank Progress
- Topic-wise Performance
- Difficulty Analysis
- Recent Battles

### 👤 User Profile
- View Profile
- Edit Username
- Interview History
- Performance Statistics

### 📚 Interview History
- Previous Battles
- Scores
- Results
- Topics
- Difficulty Level
- Date & Time

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- Recharts

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- bcrypt.js

## AI
- Google Gemini API

---

# 📂 Project Structure

```
AI-Interview-Battle-Arena
│
├── frontend
│   ├── components
│   ├── pages
│   ├── css
│   ├── assets
│   └── App.js
│
├── backend
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── controllers
│   ├── config
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Interview-Arena.git
```

Move into project folder

```bash
cd AI-Interview-Arena
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_api_key
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 💻 How It Works

1. Register/Login.
2. Choose:
   - Interview Topic
   - Difficulty Level
   - Number of Questions
3. AI generates interview questions.
4. User answers each question.
5. AI generates ideal answers.
6. AI evaluates user responses.
7. User competes against AI.
8. Results, feedback, scores, and rankings are displayed.
9. Interview history is saved for future analysis.

---

# 📊 Evaluation Criteria

Each answer is evaluated based on:

- Technical Accuracy
- Completeness
- Clarity
- Communication
- Relevance
- Overall Quality

---

# 🏅 Rank System

| Score | Rank |
|-------|------|
| 90 - 100 | 💎 Diamond |
| 70 - 89 | 🟣 Platinum |
| 50 - 69 | 🥇 Gold |
| 30 - 49 | 🥈 Silver |
| Below 30 | 🟤 Bronze |

---

# 🔒 Security Features

- JWT Authentication
- Password Encryption
- Protected API Routes
- Secure User Sessions
- Environment Variables

---

# 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/
│
├── dashboard.png
├── interview.png
├── evaluation.png
├── battle.png
└── profile.png
```

---

# 🎯 Future Improvements

- Voice-based Interviews
- Video Interview Support
- Resume Analysis
- AI Interview Coach
- Company-specific Interviews
- Coding Interview Arena
- Leaderboard
- Multi-language Support
- Interview Replay
- Recruiter Dashboard
- Real-time Speech Evaluation

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Sneha Jadhav**

GitHub: https://github.com/sj1304

---

# ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub!

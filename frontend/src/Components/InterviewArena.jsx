import { useState } from "react";
import "../css/InterviewArena.css";
import {useNavigate} from "react-router-dom";
function InterviewArena() {
const navigate=useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
const [questionCount, setQuestionCount] = useState("");
  const topics = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🍃" },
  { name: "Java", icon: "☕" },
  { name: "DBMS", icon: "🗄️" },
  { name: "OS", icon: "💻" },
  { name: "CN", icon: "🌐" },
  { name: "OOP", icon: "📦" },
  { name: "System Design", icon: "🏗️" }
];

  const levels = [
  {
    name: "Easy",
    icon: "🛡️"
  },
  {
    name: "Intermediate",
    icon: "⚔️"
  },
  {
    name: "Difficult",
    icon: "👑"
  }
];
const questionCounts = [
  5,
  10,
  15,
  20
];
  return (
    <div className="outer">
      <h2>Select your preferences</h2>

      <h3>Choose Topic</h3>

      <div className="topics-container">
        {topics.map((topic) => (
  <div
    key={topic.name}
    className={`topic-card ${
      selectedTopic === topic.name ? "selected" : ""
    }`}
    onClick={() => setSelectedTopic(topic.name)}
  >
    <span className="icon">{topic.icon}</span>
    <p>{topic.name}</p>
  </div>
))}
      </div>

      <h3>Choose Difficulty</h3>

      <div className="topics-container">
  {levels.map((level) => (
    <div
      key={level.name}
      className={`topic-card ${
        selectedLevel === level.name ? "selected" : ""
      }`}
      onClick={() => setSelectedLevel(level.name)}
    >
      <div className="difficulty icon">
        {level.icon}
      </div>

      <p>{level.name}</p>
    </div>
  ))}
</div>
<h3>Number of Questions</h3>

<div className="topics-container">
  {questionCounts.map((count) => (
    <div
      key={count}
      className={`topic-card ${
        questionCount === count ? "selected" : ""
      }`}
      onClick={() => setQuestionCount(count)}
    >
      {count}
    </div>
  ))}
</div>
      <button
  className="start-btn"
  disabled={!selectedTopic || !selectedLevel || !questionCount}
  onClick={() =>
  navigate("/battleArena", {
    state: {
      topic: selectedTopic,
      level: selectedLevel,
      noOfQuestions: questionCount
    }
  })
}
>
  ⚔️ Start Battle
</button>
    </div>
  );
}

export default InterviewArena;
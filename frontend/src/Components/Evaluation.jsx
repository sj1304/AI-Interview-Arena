import { useState, useEffect } from "react";
import "../css/Evaluation.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Evaluation() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    topic,
    level,
    responses
  } = location.state || {};

  const [evaluationData, setEvaluationData] =
    useState(null);

  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  useEffect(() => {
    const evaluateInterview = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/evaluation",
          {
            userId: localStorage.getItem("userId"),
            topic,
            level,
            responses
          }
        );

        setEvaluationData(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    if (responses) {
      evaluateInterview();
    }
  }, [responses, topic, level]);

  if (!evaluationData) {
    return (
      <div className="evaluation-container">
        <h2>Evaluating Interview...</h2>
      </div>
    );
  }

  const {
    winner,
    userTotalScore,
    aiTotalScore,
    rank,
    accuracy,
    depth,
    communication,
    consistency,
    userWins,
    aiWins,
    strengths,
    improvements,
    feedback,
    questions
  } = evaluationData;

  return (
    <div className="evaluation-container">

      {/* LEFT */}

      <div className="left-panel">

        <div className="winner-card">
          <h2>🏆 WINNER</h2>

          <h1>{winner}</h1>

          <div className="score-box">

            <div>
              <span>You</span>
              <h3>{userTotalScore}</h3>
            </div>

            <div>
              <span>AI</span>
              <h3>{aiTotalScore}</h3>
            </div>

          </div>

          <h3>{rank}</h3>
        </div>

        <div className="stats-card">

          <div>
            <h4>Accuracy</h4>
            <p>{accuracy}%</p>
          </div>


        </div>

        <div className="home-btn-area">
          <button
            className="next-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Go To Home
          </button>
        </div>

      </div>

      {/* CENTER */}

      <div className="comparison-panel">

        <h2>Question Wise Comparison</h2>

        <div className="comparison-header">
          <span>Question</span>
          <span>You</span>
          <span>AI</span>
          <span>Winner</span>
          <span>Action</span>
        </div>

        {questions.map((q, index) => (
          <div
            className="comparison-row"
            key={index}
          >
            <span>{q.question}</span>

            <span>{q.userScore}/10</span>

            <span>{q.aiScore}/10</span>

            <span>
              {q.winner === "You"
                ? "🏆 You"
                : "🤖 AI"}
            </span>

            <button
              onClick={() =>
                setSelectedQuestion(q)
              }
            >
              View
            </button>
          </div>
        ))}

        {selectedQuestion && (
          <div className="answer-modal">

            <div className="modal-top">
              <h3>
                {selectedQuestion.question}
              </h3>

              <button
                className="close-btn"
                onClick={() =>
                  setSelectedQuestion(null)
                }
              >
                ✖
              </button>
            </div>

            <div className="answer-box">
              <h4>👤 Your Answer</h4>

              <p>
                {
                  selectedQuestion.userAnswer
                }
              </p>
            </div>

            <div className="answer-box">
              <h4>🤖 AI Answer</h4>

              <p>
                {selectedQuestion.aiAnswer}
              </p>
            </div>

          </div>
        )}

      </div>

      {/* RIGHT */}

      <div className="summary-panel">

        <div className="summary-card">

          <h2>Battle Summary</h2>

          <div className="battle-score">

            <div>
              <h3>{userWins}</h3>
              <p>You Won</p>
            </div>

            <div>
              <h3>{aiWins}</h3>
              <p>AI Won</p>
            </div>

          </div>

        </div>

        <div className="good-card">

          <h3>✅ What You Did Well</h3>

          <ul>
            {strengths.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

        </div>

        <div className="improve-card">

          <h3>❌ Need Improvement</h3>

          <ul>
            {improvements.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

        </div>

        <div className="feedback-card">

          <h3>🤖 AI Feedback</h3>

          <p>{feedback}</p>

        </div>

      </div>

    </div>
  );
}

export default Evaluation;
import { useState, useEffect, useRef } from "react";
import "../css/BattleArea.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function BattleArea() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    topic,
    level,
    noOfQuestions
  } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);

  const answerRef = useRef(null);

  // Generate questions from Gemini
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/interview/generate",
          {
            topic,
            level,
            noOfQuestions
          }
        );

        setQuestions(res.data.questions);
      } catch (err) {
        console.log("Error generating questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, level, noOfQuestions]);

  // Auto focus textarea
  useEffect(() => {
    answerRef.current?.focus();
  }, [currentQuestion]);

  // Timer
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 300;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, questions]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    return `${String(min).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
  };

  const saveCurrentResponse = () => {
    return {
      question:
        questions[currentQuestion]?.question || "",

      generatedAnswer:
        questions[currentQuestion]
          ?.generatedAnswer || "",

      userAnswer: answer
    };
  };

  const finishInterview = (
    finalResponses
  ) => {
    console.log(
    "Responses sent to Evaluation:",
    finalResponses
  );


    navigate("/evaluation", {
      state: {
        topic,
        level,
        responses: finalResponses
      }
    });
  };

  const handleNextQuestion = () => {
    const currentResponse =
      saveCurrentResponse();

    const updatedResponses = [
      ...responses,
      currentResponse
    ];

    setResponses(updatedResponses);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
      setAnswer("");
      setTimeLeft(300);
    } else {
      finishInterview(updatedResponses);
    }
  };

  const handleEndInterview = () => {
    const result = window.confirm(
      "Are you sure you want to end the interview?"
    );

    if (!result) return;

    const currentResponse =
      saveCurrentResponse();

    const updatedResponses = [
      ...responses,
      currentResponse
    ];

    finishInterview(updatedResponses);
  };

  if (loading) {
    return (
      <div className="battle-container">
        <div className="battle-main">
          <h2>
            🤖 Gemini is generating your
            interview...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="battle-container">
      {/* Left Side */}

      <div className="battle-main">
        <div className="battle-header">
          <h2>
            Question {currentQuestion + 1}/
            {questions.length}
          </h2>

          <div className="timer">
            ⏱️ {formatTime()}
          </div>
        </div>

        <div className="question-card">
          <h3>
            {
              questions[currentQuestion]
                ?.question
            }
          </h3>
        </div>

        <div className="answer-section">
          <label>Your Answer</label>

          <textarea
            ref={answerRef}
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer here..."
          />
        </div>

        <div className="btn-row">
          <button
            className="next-btn"
            onClick={handleNextQuestion}
          >
            Next Question ➜
          </button>

          <button
            className="end-btn"
            onClick={handleEndInterview}
          >
            End Interview 🚩
          </button>
        </div>

        <p className="note">
          ⏱ Each question has 5 minutes
        </p>
      </div>

      {/* Right Side */}

      <div className="battle-sidebar">
        <div className="ai-card">
          <h3>🤖 AI Interviewer</h3>

          <div className="thinking-box">
            <span className="green-dot"></span>
            Gemini generated the questions and
            model answers.
          </div>
        </div>

        <div className="progress-card">
          <h3>Interview Progress</h3>

          <ul>
            <li>
              ✅ Question{" "}
              {currentQuestion + 1} Loaded
            </li>

            <li>
              ⚡ AI Answer Generated
            </li>

            <li>
              🔒 Hidden Until Evaluation
            </li>

            <li>
              📝 Answers Saved:{" "}
              {responses.length}
            </li>
          </ul>
        </div>

        <div className="privacy-card">
          <h3>🔐 Answers Are Private</h3>

          <p>
            AI answers are being stored in
            the background.
          </p>

          <p>
            Comparison and evaluation will
            happen only after the interview
            ends.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BattleArea;
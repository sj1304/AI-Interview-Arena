import { useEffect, useState } from "react";
import axios from "axios";
import "../css/History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:5000/api/history/${userId}`
    );

      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="history-page">
      <h1>Interview History</h1>

      <div className="history-container">

        {history.map((item) => (
          <div
            className="history-card"
            key={item._id}
          >
            <h3>{item.topic}</h3>

            <p>
              Level: {item.level}
            </p>

            <p>
              Score: {item.score}
            </p>

            <p>
  Date: {new Date(item.createdAt).toLocaleDateString()}
</p>

            <span
  className={`result ${
    item.result.toLowerCase()
  }`}
>
  {item.result === "Won" ? "🏆 Won" : "❌ Lost"}
</span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default History;
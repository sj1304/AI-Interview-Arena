import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    name: "",
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    rank: "",
    topicsAttempted: 0,

    streak: 0,
    battlesWon: 0,
    winRate: 0,
    level: 1,

    strongestTopic: {
      topic: "-",
      average: 0
    },

    weakestTopic: {
      topic: "-",
      average: 0
    },

    difficultyStats: {
      Easy: 0,
      Intermediate: 0,
      Hard: 0
    },

    chartData: [],
    recentInterviews: [],

    summary: ""
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:5000/api/dashboard/${userId}`
      );

      setDashboardData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const TOTAL_TOPICS = 8;

  const pieData = [
    {
      name: "Attempted",
      value: dashboardData.topicsAttempted
    },
    {
      name: "Remaining",
      value: Math.max(
        0,
        TOTAL_TOPICS - dashboardData.topicsAttempted
      )
    }
  ];

  const COLORS = [
    "#00f5ff",
    "#334155"
  ];

  const difficultyData = [
    {
      level: "Easy",
      count: dashboardData.difficultyStats?.Easy || 0
    },
    {
      level: "Intermediate",
      count:
        dashboardData.difficultyStats?.Intermediate ||
        0
    },
    {
      level: "Hard",
      count: dashboardData.difficultyStats?.Hard || 0
    }
  ];

  return (
    <div className="dashboard-container">

      {/* HERO */}

      <div className="hero-section">

        <div>

          <h1>
            Welcome Back, {dashboardData.name} 👋
          </h1>

          <p>
            Ready for your next AI Interview Battle?
          </p>

          <br />

          <p>
            ⚠️ One Interview Per Day
          </p>

        </div>

        <button
          className="battle-btn"
          onClick={() =>
            navigate("/interviewarena")
          }
        >
          Start Battle ⚔️
        </button>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Interviews</h3>
          <p>{dashboardData.totalInterviews}</p>
        </div>

        <div className="stat-card">
          <h3>Average Score</h3>
          <p>{dashboardData.averageScore}%</p>
        </div>

        <div className="stat-card">
          <h3>Best Score</h3>
          <p>{dashboardData.bestScore}%</p>
        </div>

        <div className="stat-card">
          <h3>Current Rank</h3>
          <p>{dashboardData.rank}</p>
        </div>

        <div className="stat-card">
          <h3>🔥 Streak</h3>
          <p>{dashboardData.streak} Days</p>
        </div>

        <div className="stat-card">
          <h3>⚔️ Win Rate</h3>
          <p>{dashboardData.winRate}%</p>
        </div>

        <div className="stat-card">
          <h3>🏆 Battles Won</h3>
          <p>{dashboardData.battlesWon}</p>
        </div>

        <div className="stat-card">
          <h3>⭐ Level</h3>
          <p>{dashboardData.level}</p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="dashboard-charts">

        {/* PERFORMANCE */}

        <div className="chart-section">

          <h2>Performance Overview</h2>

          {dashboardData.chartData.length > 0 ? (

            <div className="charts-section">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={dashboardData.chartData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        "#0f172a",
                      border:
                        "1px solid #00f5ff",
                      color: "#fff"
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#00f5ff"
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      fill: "#00f5ff"
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          ) : (

            <p>No interview data available.</p>

          )}

        </div>

        <div className="mini-charts-row">

          {/* PIE */}

          <div className="chart-section">

            <h2>Topic Coverage</h2>

            <div className="charts-section piechart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >

                    {pieData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR */}

          <div className="chart-section">

            <h2>Difficulty Analysis</h2>

            <div className="charts-section">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={difficultyData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="level"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    allowDecimals={false}
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#00f5ff"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>
                {/* TOPIC INSIGHTS */}

        <div className="topic-insights">

          <div className="insight-card">

            <h2>🏆 Strongest Topic</h2>

            <h3>
              {dashboardData.strongestTopic.topic}
            </h3>

            <p>
              Average Score:
              {" "}
              {dashboardData.strongestTopic.average}%
            </p>

          </div>

          <div className="insight-card">

            <h2>📉 Needs Improvement</h2>

            <h3>
              {dashboardData.weakestTopic.topic}
            </h3>

            <p>
              Average Score:
              {" "}
              {dashboardData.weakestTopic.average}%
            </p>

          </div>

        </div>

      </div>

      {/* RECENT INTERVIEWS */}

      <div className="recent-section">

        <div className="section-header">

          <h2>Recent Interviews</h2>

          <button
            className="history-btn"
            onClick={() => navigate("/history")}
          >
            View Full History
          </button>

        </div>

        {dashboardData.recentInterviews.length > 0 ? (

          <table className="recent-table">

            <thead>

              <tr>

                <th>Topic</th>

                <th>Score</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {dashboardData.recentInterviews.map(
                (interview, index) => (

                  <tr key={index}>

                    <td>
                      {interview.topic}
                    </td>

                    <td>
                      {interview.score}%
                    </td>

                    <td>
                      {new Date(
                        interview.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        ) : (

          <p>
            No interviews attempted yet.
          </p>

        )}

      </div>

      {/* AI SUMMARY */}

      <div className="ai-suggestion-section">

        <h2>
          🤖 AI Learning Summary
        </h2>

        <div className="ai-box">

          <p>

            {dashboardData.summary ||

              "Complete your first interview to receive personalized AI learning insights and recommendations."}

          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
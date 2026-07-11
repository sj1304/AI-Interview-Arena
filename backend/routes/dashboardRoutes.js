const express = require("express");
const router = express.Router();

const Interview = require("../models/Interview");
const User = require("../models/User");
const UserSummary = require("../models/UserSummary");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const summaryDoc = await UserSummary.findOne({ userId }).lean();

    /* ---------------- TOTAL INTERVIEWS ---------------- */

    const totalInterviews = interviews.length;

    /* ---------------- AVERAGE SCORE ---------------- */

    const averageScore =
      totalInterviews > 0
        ? Number(
            (
              interviews.reduce(
                (sum, interview) => sum + interview.score,
                0
              ) / totalInterviews
            ).toFixed(1)
          )
        : 0;

    /* ---------------- BEST SCORE ---------------- */

    const bestScore =
      totalInterviews > 0
        ? Math.max(...interviews.map((i) => i.score))
        : 0;

    /* ---------------- RANK ---------------- */

    const rankPoints =
      averageScore * 0.7 +
      totalInterviews * 0.3;

    let rank = "🥉 Bronze";

    if (rankPoints >= 90) {
      rank = "💎 Diamond";
    } else if (rankPoints >= 70) {
      rank = "🏆 Platinum";
    } else if (rankPoints >= 50) {
      rank = "🥇 Gold";
    } else if (rankPoints >= 30) {
      rank = "🥈 Silver";
    }

    /* ---------------- RECENT INTERVIEWS ---------------- */

    const recentInterviews = interviews.slice(0, 3);

    /* ---------------- PERFORMANCE GRAPH ---------------- */

    const chartData = [...interviews]
      .reverse()
      .map((interview) => ({
        date: new Date(interview.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        score: interview.score,
      }));

    /* ---------------- TOPIC COVERAGE ---------------- */

    const topicsAttempted = new Set(
      interviews.map((i) => i.topic)
    ).size;

    /* ---------------- DIFFICULTY ANALYSIS ---------------- */

    const difficultyStats = {
      Easy: 0,
      Intermediate: 0,
      Hard: 0,
    };

    interviews.forEach((interview) => {
      if (
        interview.level &&
        difficultyStats.hasOwnProperty(interview.level)
      ) {
        difficultyStats[interview.level]++;
      }
    });

    /* ---------------- STRONGEST & WEAKEST TOPIC ---------------- */

    const topicMap = {};

    interviews.forEach((interview) => {
      if (!topicMap[interview.topic]) {
        topicMap[interview.topic] = {
          total: 0,
          count: 0,
        };
      }

      topicMap[interview.topic].total += interview.score;
      topicMap[interview.topic].count++;
    });

    let strongestTopic = {
      topic: "-",
      average: 0,
    };

    let weakestTopic = {
      topic: "-",
      average: 0,
    };

    const topicAverages = Object.keys(topicMap).map((topic) => ({
      topic,
      average: Math.round(
        topicMap[topic].total /
        topicMap[topic].count
      ),
    }));

    if (topicAverages.length > 0) {
      strongestTopic = topicAverages.reduce((a, b) =>
        a.average > b.average ? a : b
      );

      weakestTopic = topicAverages.reduce((a, b) =>
        a.average < b.average ? a : b
      );
    }

    /* ---------------- TEMP VALUES ---------------- */

    const streak = totalInterviews;
    const battlesWon = interviews.filter(
      (i) => i.score >= 70
    ).length;

    const winRate =
      totalInterviews > 0
        ? Math.round(
            (battlesWon / totalInterviews) * 100
          )
        : 0;

    const level =
      Math.floor(totalInterviews / 5) + 1;

    /* ---------------- RESPONSE ---------------- */

    res.json({
      name: user.name,

      totalInterviews,

      averageScore,

      bestScore,

      rank,

      streak,

      battlesWon,

      winRate,

      level,

      strongestTopic,

      weakestTopic,

      topicsAttempted,

      difficultyStats,

      chartData,

      recentInterviews,

      summary:
        summaryDoc?.summary ||
        "Complete your first interview to receive personalized AI improvement suggestions.",
    });
  } catch (err) {
    console.error("Dashboard Error:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
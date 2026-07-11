const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const UserSummary = require("../models/UserSummary");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { userId, topic, level, responses } = req.body;

    if (!userId || !responses || responses.length === 0) {
      return res.status(400).json({
        message: "userId and responses are required."
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    // ---------------- AI EVALUATION PROMPT ----------------
    const prompt = `
You are an expert technical interviewer.

Evaluate each response.

Topic: ${topic}
Difficulty: ${level}

Responses:
${JSON.stringify(responses, null, 2)}

Rules:
1. Evaluate each question by comparing User answer and AI answer.
2. Score both User and AI answers out of 10.
3. Multiply User score by 1.5. If it exceeds 10, cap it at 10.
4. Be moderately strict while scoring.
5. Decide winner per question based on final scores.
6. If scores are equal, declare "Tie".
7. Return ONLY valid JSON.
Format:
{
  "questions": [
    {
      "question": "",
      "userScore": 0,
      "aiScore": 10,
      "winner": "",
      "userAnswer": "",
      "aiAnswer": ""
    }
  ],
  "strengths": [],
  "improvements": [],
  "feedback": ""
}
`;

    // ---------------- RETRY LOGIC ----------------
    let result;
    let attempts = 3;

    for (let i = 0; i < attempts; i++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (err) {
        console.log(`Attempt ${i + 1} failed`);

        if (i === attempts - 1) throw err;

        await new Promise(res =>
          setTimeout(res, 1000 * (i + 1))
        );
      }
    }

    // ---------------- CLEAN RESPONSE ----------------
    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let evaluation;

    try {
      evaluation = JSON.parse(cleaned);
    } catch (err) {
      console.log("JSON Parse Error:", cleaned);

      return res.status(500).json({
        message: "AI returned invalid JSON"
      });
    }

    // ---------------- MANUAL CALCULATION ----------------

    const questions = evaluation.questions || [];

    const userTotalScore = questions.reduce(
      (sum, q) => sum + (q.userScore || 0),
      0
    );

    const aiTotalScore = questions.length * 9;

    const userWins = questions.filter(
      q => q.winner === "You"
    ).length;

    const aiWins = questions.filter(
      q => q.winner === "AI"
    ).length;

    const accuracy =
      aiTotalScore > 0
        ? (userTotalScore / aiTotalScore) * 100
        : 0;

    let rank = "";

    if (accuracy >= 90) rank = "🏆 Diamond";
    else if (accuracy >= 75) rank = "🥇 Gold";
    else if (accuracy >= 60) rank = "🥈 Silver";
    else rank = "🥉 Bronze";

    // ---------------- SAVE INTERVIEW ----------------

    await Interview.create({
      userId,
      topic,
      level,
      score: userTotalScore,
      result: userWins >= aiWins ? "Won" : "Lost"
    });

    // ---------------- SUMMARY GENERATION ----------------

    let existingSummary = await UserSummary.findOne({ userId });

    const previousSummary = existingSummary
      ? existingSummary.summary
      : "This is the user's first interview.";

    const summaryPrompt = `
You are an AI interview mentor.

Previous Summary:
${previousSummary}

Current Interview:
Topic: ${topic}
Level: ${level}
Score: ${userTotalScore}/100

Strengths:
${(evaluation.strengths || []).join("\n")}

Improvements:
${(evaluation.improvements || []).join("\n")}

Feedback:
${evaluation.feedback}

Task:
- Compare progress
- Mention improvements
- Mention weak areas
- Keep under 50 words
- Return ONLY text
`;

    const summaryModel = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const summaryResult = await summaryModel.generateContent(summaryPrompt);

    const newSummary = summaryResult.response.text().trim();

    if (existingSummary) {
      existingSummary.summary = newSummary;
      await existingSummary.save();
    } else {
      await UserSummary.create({
        userId,
        summary: newSummary
      });
    }

    // ---------------- FINAL RESPONSE ----------------

    const finalResult = {
      ...evaluation,
      userTotalScore,
      aiTotalScore,
      userWins,
      aiWins,
      accuracy,
      rank,
      summary: newSummary
    };

    res.json(finalResult);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Evaluation failed."
    });
  }
});

module.exports = router;
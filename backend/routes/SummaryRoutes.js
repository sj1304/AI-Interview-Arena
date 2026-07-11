const express = require("express");
const router = express.Router();

const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const UserSummary = require("../models/UserSummary");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post("/update", async (req, res) => {
  try {
    const {
      userId,
      topic,
      level,
      score,
      strengths,
      improvements,
      feedback
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required."
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    // Find previous summary
    let existingSummary = await UserSummary.findOne({
      userId
    });

    const previousSummary = existingSummary
      ? existingSummary.summary
      : "This is the user's first interview.";

    const prompt = `
You are an AI interview mentor.

Previous Learning Summary:

${previousSummary}

Current Interview

Topic: ${topic}

Difficulty: ${level}

Overall Score: ${score}/100

Strengths:
${strengths.join("\n")}

Needs Improvement:
${improvements.join("\n")}

Interview Feedback:
${feedback}

Task:

1. Compare this interview with the previous summary.
2. Mention what has improved.
3. Mention recurring weak areas.
4. Mention newly developed strengths.
5. Give a concise overall progress summary.
6. Keep it under 180 words.
7. Return ONLY the summary text.
`;

    const result = await model.generateContent(prompt);

    const newSummary = result.response
      .text()
      .trim();

    if (existingSummary) {
      existingSummary.summary = newSummary;
      await existingSummary.save();
    } else {
      existingSummary = await UserSummary.create({
        userId,
        summary: newSummary
      });
    }

    res.status(200).json({
      success: true,
      summary: newSummary
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update summary."
    });
  }
});

module.exports = router;
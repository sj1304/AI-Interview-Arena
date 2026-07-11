const express = require("express");
const router = express.Router();

const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post(
  "/generate",
  async (req, res) => {

    console.log("Route hit");
    console.log(req.body);


    try {
      const {
        topic,
        level,
        noOfQuestions
      } = req.body;

      const model =
        genAI.getGenerativeModel({
       model: "gemini-2.5-flash-lite"
        });

      const prompt = `
Generate ${noOfQuestions} ${level} interview questions on ${topic} with Your answers human like not too detailed.

Return ONLY valid JSON:

{
  "questions":[
    {
      "question":"",
      "generatedAnswer":""
    }
  ]
}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const text =
        result.response.text();

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);

      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          "Question generation failed"
      });
    }
  }
);

module.exports = router;
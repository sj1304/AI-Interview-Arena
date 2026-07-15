const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const summaryRoutes = require("./routes/SummaryRoutes");
// Routes
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();
const historyRoutes = require("./routes/history");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});


app.use("/api", historyRoutes);
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use(
  "/api/dashboard",
  dashboardRoutes
);


const interviewRoutes = require(
  "./routes/interviewRoutes"
);
app.use(
  "/api/interview",
  interviewRoutes
);

const evaluationRoutes = require("./routes/EvaluationRoutes");

app.use("/api/evaluation", evaluationRoutes);

app.use("/api/summary", summaryRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
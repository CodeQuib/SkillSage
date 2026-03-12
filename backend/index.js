const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001/recommend";

// Middleware
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "SkillSage API Server" });
});

// POST /api/recommend
app.post("/api/recommend", async (req, res) => {
  const { user_interest } = req.body;

  if (!user_interest || typeof user_interest !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'user_interest' field." });
  }

  const query = user_interest.trim();
  if (!query) {
    return res.status(400).json({ error: "Interest/query cannot be empty." });
  }

  try {
    const mlResponse = await axios.post(ML_SERVICE_URL, { query }, {
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    const { recommended_courses } = mlResponse.data;
    return res.json({ recommended_courses });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({ error: "ML service is unavailable. Please ensure the Python server is running." });
    }
    const msg = error.response?.data?.error || error.message || "Internal server error";
    return res.status(500).json({ error: msg });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Unexpected server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillSage API running on http://localhost:${PORT}`);
});

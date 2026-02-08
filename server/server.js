require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");



const app = express();

app.use(express.json());
app.use(cors());

// 🔑 Ensure MongoDB is connected BEFORE routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🚫 NO app.listen() on Vercel

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running locally on port ${PORT}`)
  );
}

module.exports = app;


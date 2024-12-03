const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const moneyRoutes = require("./routes/monies");
const syreduRoutes = require("./routes/syredu");
const bacRoutes = require("./routes/bac");
const syrRoutes = require("./routes/syr");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

app.use(
  cors({
    origin: ["https://souriana-react.vercel.app","https://facebook-scrape-ui-rhdm.vercel.app","https://facebook-scrape-ui.vercel.app"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/monies", moneyRoutes);
app.use("/api/syredu", syreduRoutes);
app.use("/api/bac", bacRoutes);
app.use("/api/syr", syrRoutes);

module.exports = app;

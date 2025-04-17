const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// ✅ CORS setup for your Netlify frontend
app.use(cors({
  origin: 'https://fanciful-beignet-4e73ce.netlify.app',
  credentials: true
}));

// ✅ Updated MongoDB connection (no deprecated options)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ NOT CONNECTED TO NETWORK", err));

// Routes
app.use("/", Routes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});

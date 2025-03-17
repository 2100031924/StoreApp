require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");  

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);  

sequelize.sync().then(() => {
  console.log("✅ Database Synced");
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
});

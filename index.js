const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth.routes");
const engineerRoutes = require("./routes/engineer.routes");
const projectRoutes = require("./routes/project.routes");
const assignmentRoutes = require("./routes/assignment.routes");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

initializeDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Engineering Resource Management System API" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`A ERMS app server is running on port ${PORT}`);
});

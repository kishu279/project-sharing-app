require("dotenv").config();
const express = require("express");
const db = require("./db/database.js");
const cors = require("cors");

const app = express();
const { PORT } = process.env;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTION"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const UserRoutes = require("./routes/UserRoutes.js");
const ProjectRoutes = require("./routes/ProjectRoutes.js");

async function main() {
  app.listen(PORT, () => {
    console.log("Listening on port 3000");
  });

  db.connectDB();
  db.CreateTable();
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: false,
    message: "Hii this side sourav",
  });
});

app.use("/user", UserRoutes);
app.use("/project", ProjectRoutes);

main();

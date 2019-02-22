const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const projectRoutes = require("./routes/projectRoutes");
const actionRoutes = require("./routes/actionRoutes");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

server.get("/api", (req, res) => {
  res.send("Server works.");
});

module.exports = server;

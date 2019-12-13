const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World"
  });
});

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
  console.log("app runnin");
});

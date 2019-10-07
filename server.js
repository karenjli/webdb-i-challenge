const express = require("express");

const db = require("./data/dbConfig.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts");
    .then(account => {
      res.json(account);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "There is an error" });
    });
});

module.exports = server;

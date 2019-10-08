const express = require("express");

const db = require("./data/dbConfig.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "There is an error" });
    });
});

server.get("/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(account => {
      if (!account) {
        res
          .status(404)
          .json({ message: "There is no account associated to this ID" });
      } else {
        res.status(200).json(account);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/", (req, res) => {
  const postAccount = req.body;
  if (!postAccount.name || !postAccount.budget) {
    res.status(400).json({ message: "Name and Budget are required" });
  } else {
    db("accounts")
      .insert(postAccount, "id")
      .then(ids => {
        res.status(200).json(ids);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

server.put("/:id", (req, res) => {
  const updatebody = req.body;
  if (!updatebody.name || !updatebody.budget) {
    res.status(404).json({ message: "Name and Budget required for update" });
  } else {
    db("accounts")
      .where({ id: req.params.id })
      .update(updatebody)
      .then(account => {
        if (!account) {
          res
            .status(404)
            .json({ message: "There is no account associated to this ID" });
        } else {
          res.status(200).json(account);
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

server.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(account => {
      if (!account) {
        res
          .status(404)
          .json({ message: "There is no account associated with this ID" });
      } else {
        res.status(200).json(account);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = server;

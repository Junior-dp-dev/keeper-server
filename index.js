const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: host,
  user: user,
  password: password,
  port: port,
  database: database,
});

app.get("/", (req, res) => {
  res.send(`Servidor Funcionando na URL da solicitação: ${req.protocol}://${req.get("host")}${req.originalUrl}`);
});

app.get("/getNotes", (req, res) => {
  let SQL = "SELECT * FROM kepper";
  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/register", (req, res) => {
  const { title } = req.body;
  const { content } = req.body;

  let SQL = "INSERT INTO kepper (title, content) VALUES (?, ?)";
  db.query(SQL, [title, content], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { content } = req.body;

  let SQL = "UPDATE kepper SET title = ?, content = ? WHERE id = ?";
  db.query(SQL, [title, content, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM kepper WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}! ou 3000`);
});

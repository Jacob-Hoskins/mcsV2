const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.static(`${__dirname}/public`));

//html files
const index = fs.readFileSync(`${__dirname}/public/index.html`);
const singUpPage = fs.readFileSync(`${__dirname}/public/signup.html`);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.status(200).end(index);
});

app.get("/signup", (req, res) => {
  res.status(200).end(singUpPage);
});

module.exports = app;

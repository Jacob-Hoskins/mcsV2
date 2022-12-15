const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect("mongodb://127.0.0.1:27017/MCS").then(() => {
  console.log("DB Connected");
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});

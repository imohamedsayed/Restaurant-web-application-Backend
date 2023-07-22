const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://MSO:mso123456@node.d5zfykw.mongodb.net/restaurant?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(8000, () => {
      console.log("App is listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo : ", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/AuthRoutes"));

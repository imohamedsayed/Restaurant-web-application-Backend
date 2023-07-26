const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const dbURI = "mongodb://localhost:27017/restaurant";

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

app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
  --> Auth Routes
*/
app.use("/api/auth", require("./routes/AuthRoutes"));

/*
  --> Dashboard Routes
*/

app.use("/api-dashboard/category", require("./routes/CategoryRoutes"));
app.use("/api-dashboard/dishes", require("./routes/DishRoutes"));
app.use("/api-dashboard/users", require("./routes/UserRoutes"));

/*
  --> Website Routes
*/

app.use("/api/category", require("./routes/website/CategoryRoutes"));

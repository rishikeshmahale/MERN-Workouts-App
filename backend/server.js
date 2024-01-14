const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");

// express app
const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.path} : request path && ${req.method} : req method`);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listening for requests
    app.listen(PORT, () => {
      console.log(`Connected to database and listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });



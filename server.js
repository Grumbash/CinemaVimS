const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const theaters = require("./routes/api/theaters");
const movie = require("./routes/api/movies");
const show = require("./routes/api/shows");
const seats = require("./routes/api/seats");
const rows = require("./routes/api/rows");
const halls = require("./routes/api/halls");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/theaters", theaters);
app.use("/api/movies", movie);
app.use("/api/shows", show);
app.use("/api/seats", seats);
app.use("/api/rows", rows);
app.use("/api/halls", halls);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`
  ------------------------------------
      Server running on port ${port}    
  ------------------------------------
  `);
});

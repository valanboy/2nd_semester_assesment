const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const mongodbUrl = process.env.mongodbUrl;
const port = process.env.port ||3000;

// conenction to mongodb
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



mongoose.connection.on("connected", ()=>{
  console.log("connected successfully to mongodb")
});

  mongoose.connection.on('error', (err) => {
      console.log('Error connecting to MongoDB', err);
  })

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))


// server configurations....
app.listen(port, () => console.log(`Server started listening on port: ${port}`));

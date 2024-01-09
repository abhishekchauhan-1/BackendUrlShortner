// db.js
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://singhchauhanabhishek816:Abhi123@cluster0.4fiq4mm.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
const clubRoutes = require("./routes/clubs");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("football");
    app.locals.db = db;
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

app.use("/clubs", clubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

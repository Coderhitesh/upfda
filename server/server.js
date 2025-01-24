const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

connectDB();
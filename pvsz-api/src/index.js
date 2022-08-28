const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
app.use(cors());
// Accept json data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ code: 0, message: "sucess" });
});

app.use("/api/v1", require("./router"));

app.listen(5000, () => {
    console.log("the server is running:localhost:5000");
});

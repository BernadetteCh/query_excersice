const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port);

console.log("http://localhost:" + port);

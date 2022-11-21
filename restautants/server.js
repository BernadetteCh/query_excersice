const express = require("express");
const app = express();
const mongoose = require("mongoose");
const restaurant = require("./restaurantSchema");
const db = mongoose.connection;
const fs = require("fs");
const port = 9000;

mongoose.connect("mongodb://localhost/restaurants");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port);

async function saveData() {
  const object = fs.readFileSync("./restaurants.json", "utf-8");
  let json = await JSON.parse(object);

  await restaurant.deleteMany();
  await restaurant.insertMany(json.restaurants);
}

saveData();

console.log("http://localhost:" + port);

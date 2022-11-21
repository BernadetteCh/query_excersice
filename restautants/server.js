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

app.get("/", (req, res) => {
  db.collection("restaurants")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
//display id, name, borough, cuisine
app.get("/secondtask", async (req, res) => {
  await restaurant
    .find({})
    .select({ name: 1, restaurant_id: 1, borough: 1, cuisine: 1 })
    .then((result) => {
      res.send(result);
    });
});

app.get("/thirdtask", async (req, res) => {
  await restaurant
    .find({})
    .select({ name: 1, restaurant_id: 1, borough: 1, cuisine: 1, _id: 0 })
    .then((result) => {
      res.send(result);
    });
});

//find all fields with name, restaurant_id , brough but exclude :id
app.get("/fourthtask", async (req, res) => {
  await restaurant
    .find({})
    .select({ name: 1, restaurant_id: 1, borough: 1, _id: 0 })
    .then((result) => {
      res.send(result);
    });
});

//find all restaurants with borough "Bronx"
app.get("/fifthtask", async (req, res) => {
  await restaurant.find({ borough: "Bronx" }).then((result) => {
    res.send(result);
  });
});

//find all restaurants with borough "Bronx" the first of the list
app.get("/sixthtask", async (req, res) => {
  await restaurant
    .find({ borough: "Bronx" })
    .limit(5)
    .then((result) => {
      res.send(result);
    });
});

//get all 2 restaurants after skipping the first 2 restaurants of borough "brons"
app.get("/seventhtask", async (req, res) => {
  await restaurant
    .find({ borough: "Bronx" })
    .skip(2)
    .limit(2)
    .then((result) => {
      res.send(result);
    });
});

//all restaurants with a score greater than 90

app.get("/eigthtask", async (req, res) => {
  //db.restaurants.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });
  await restaurant
    .find({ grades: { $elemMatch: { score: { $gt: 90 } } } })
    .then((result) => {
      res.send(result);
    });
});

//all restaurants more than 80 but less than 100
app.get("/ninehtask", async (req, res) => {
  await restaurant
    .find({ grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } } })
    .then((result) => {
      res.send(result);
    });
});

// restaurants which locate in latitude value less than -95.754168
app.get("/ten", async (req, res) => {
  await restaurant.find({ coord: { $lt: -95.754168 } }).then((result) => {
    res.send(result);
  });
});

async function saveData() {
  const object = fs.readFileSync("./restaurants.json", "utf-8");
  let json = await JSON.parse(object);

  await restaurant.deleteMany();
  await restaurant.insertMany(json.restaurants);
}

saveData();

console.log("http://localhost:" + port);

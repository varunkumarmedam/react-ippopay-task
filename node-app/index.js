const dotenv = require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(bodyParser.json()); // body content parsing
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Handling GET request and retrieve all saved records
app.get("/all", async function (req, res) {
  try {
    const client = new MongoClient(process.env.MAIN_CLUSTER);
    await client.connect(); // Connecting to database
    const results_collection = client.db("ippopay").collection("results-log");
    const results_records = await results_collection.find({}).toArray(); // Getting all records from db
    client.close(); // Closing the db connection
    res.status(200).json({
      results: results_records,
      status: "Fetched all records successfully",
    });
  } catch (e) {
    res
      .status(502)
      .send({ error: "Failed to fetch the records", message: e.message });
  }
});

// Handling POST request and saving request info to mongodb
app.post("/", async function (req, res) {
  try {
    if (!req.body.input) throw new Error("Input cant be empty");
    if (!req.body.output) throw new Error("Output cant be empty");

    const client = new MongoClient(process.env.MAIN_CLUSTER);
    await client.connect(); // Connecting to database
    const results_collection = client.db("ippopay").collection("results-log");
    await results_collection.insertOne({
      input: req.body.input,
      output: req.body.output,
      created_date: new Date().toISOString(),
    }); // Writing to db
    client.close(); // Closing the db connection
    res.status(200).json({
      status: "Added record successfully",
    });
  } catch (e) {
    res
      .status(502)
      .send({ error: "Failed to add the record", message: e.message });
  }
});

app.listen(3000, () => {
  console.log("application started at 3000 port");
});

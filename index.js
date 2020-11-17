const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri =
  "mongodb+srv://sufian:2Q8e327Z0aTmol1J@cluster0.g1gxo.mongodb.net/apartmentHunt?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send("hello from db , its working good");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookingCollection = client
    .db("apartmentHunt")
    .collection("bookingList");

  const myRentCollection = client.db("apartmentHunt").collection("myRentList");
  const houseListCollection = client
    .db("apartmentHunt")
    .collection("houseList");

  app.get("/houseList", (req, res) => {
    houseListCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/myRent", (req, res) => {
    myRentCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/allBooking", (req, res) => {
    bookingCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/addBooking", (req, res) => {
    const booking = req.body;
    console.log(booking);
    bookingCollection.insertOne(booking).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.listen(process.env.PORT || port);

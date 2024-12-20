const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54rjrr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const cofeCollection = client.db("coffeeDB").collection("coffee");

    // create
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await cofeCollection.insertOne(newCoffee);
      res.send(result);
    });

    // read
    app.get("/coffee", async (req, res) => {
      const result = await cofeCollection.find().toArray();
      res.send(result);
    });

    // read single
    app.get("/coffee/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await cofeCollection.findOne(query);
      res.send(result);
    });

    // delete
    app.delete("/coffee/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await cofeCollection.deleteOne(query);
      res.send(result);
    });

    // update
    app.put("/coffee-update/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updatedCofe = req.body;
      const coffee = {
        $set: {
          ...updatedCofe,
        },
      };
      const result = await cofeCollection.updateOne(filter, coffee, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// routes
app.get("/", (req, res) => {
  res.send("Hi Coffee");
});

app.listen(PORT, () => {
  console.log(`Server is Running: ${PORT} `);
});

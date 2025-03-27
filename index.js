
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const port = 5000;
const router = express.Router();
require('dotenv').config();

const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch(e){
    console.log(e);
  } 
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run();
// run().catch(console.dir);



const app = express();

const getAPI = (req, res) => {
    res.status(200).json({message: 'Get todos'})
  }  
router.route('/').get(getAPI)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


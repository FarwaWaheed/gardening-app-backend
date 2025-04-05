const mongoose = require('mongoose');
const express = require('express');
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser')
const user = require("./routes/userRoutes")
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

//listening on port 5000
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
})

const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB ✅"))
    .catch(err => console.error("MongoDB connection error:", err));
// run().catch(console.dir);
//routes
app.use("/user",user);




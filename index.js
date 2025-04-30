const mongoose = require ('mongoose');
const express = require('express');
const PORT = 5000;
const bodyParser = require('body-parser')
const user = require("./routes/userRoutes")
const plant = require("./routes/plantRoutes")
const garden = require("./routes/gardenRoutes")
const group = require("./routes/groupRoutes")
const plantRecords = require("./routes/plantRecordRoutes")
const reminders = require("./routes/reminderRoutes")

const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => {
  console.log('✅ Connected to MongoDB successfully', mongoose.connection.name);
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err.message);
});

//routes
app.use("/user",user, reminders);
app.use("/plant",plant,plantRecords);
app.use("/garden", garden);
app.use("/group", group);




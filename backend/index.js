const express = require('express')
const data = require('./data')
const cors = require('cors');
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const config = require("./config.js")
const mongoose = require('mongoose')
const userRoute = require('../backend/routers/userRoutes.js')
const productRoute = require('../backend/routers/productRoutes.js')
dotenv.config();
const url = config.MONGO_URL;
mongoose.connect(url,{
  useNewUrlParser: true,
  
  }).then(() => {
    console.log("Connected to MongoDB")
    }).catch(err => {
      console.log(err.message)
    
})


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/users",userRoute);

app.use("/api/products",productRoute)




app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
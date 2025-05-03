const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');

const app = express()
const PORT = 4000;

dotEnv.config();
//To connect to mongodb and to access mongo_uri from .env file
mongoose.connect(process.env.MONGO_URI) 
    .then(()=>console.log("Mongodb connected successfully"))
    .catch((error)=>console.log(error))

    
app.use(bodyParser.json())
app.use('/vendor', vendorRoutes);


app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`)
})
app.use('/home', (req, res)=>{
    res.send("<h1> welcome to Order and Go");
})
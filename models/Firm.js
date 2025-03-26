const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true
    }
});



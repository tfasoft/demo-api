const app = require('./app/app');
const mongoose = require("mongoose");

require('dotenv').config();
const env = process.env;

mongoose.connect(env.MONGO_URL)
    .then((connection) => {
        console.log('Connected');
        app.listen(env.PORT || 5000);
    })
    .catch((error) => console.log(error));
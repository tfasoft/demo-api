const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModule = new Schema({
    tid: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
}, {timestamps: true});

const User = mongoose.model('user', userModule);

module.exports = User;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModule = new Schema({
    tid: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = mongoose.model('user', userModule);

module.exports = User;
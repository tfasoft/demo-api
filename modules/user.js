const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModule = new Schema({
    tid: {
        type: Number,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String,
        required: false,
        default: null
    },
}, {timestamps: true});

const User = mongoose.model('user', userModule);

module.exports = User;
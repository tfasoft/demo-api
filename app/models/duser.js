const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModule = new Schema({
    tid: {
        type: String,
        required: false,
        default: null,
    },
    email: {
        type: String,
        required: false,
        default: null,
    },
    password: {
        type: String,
        required: false,
        default: null,
    },
    name: {
        type: String,
        required: false,
        default: null,
    },
}, {timestamps: true});

const User = mongoose.model('user', UserModule);

module.exports = User;

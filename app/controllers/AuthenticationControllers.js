const tfa = require('tfa-node-sdk');

const User = require('../models/user');

const TelegramAuthentication = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const auth = new tfa("WuBjwvrQencoplabrUtPvDKaz");
    const result = auth.authUser(req.body.tid);

    result.then((response) => {
       res.send(response);
    });
}

const EmailPasswordRegister = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send(req.body);
}

const EmailPasswordLogin = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send(req.body);
}

module.exports = {
    TelegramAuthentication,
    EmailPasswordRegister,
    EmailPasswordLogin,
}
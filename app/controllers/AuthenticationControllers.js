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

    const user = new User(req.body);
    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
}

const EmailPasswordLogin = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    User.findOne(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error)
        });
}

module.exports = {
    TelegramAuthentication,
    EmailPasswordRegister,
    EmailPasswordLogin,
}
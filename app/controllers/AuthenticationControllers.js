const tfa = require('tfa-node-sdk');

const User = require('../models/user');

const TelegramAuthentication = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const auth = new tfa("WuBjwvrQencoplabrUtPvDKaz");
    const result = auth.authUser(req.body.user_token);

    result.then((response) => {
        const code = response.status;
        const data = response.data;

       if (code === 200) {
           User.findOne({ tid: data.user.tid })
               .then((result) => {
                   const userData = {
                       tid: data.user.tid,
                   };

                   if (result === null) {
                       const user = new User(userData);
                       user.save()
                           .then((userFromMongo) => {
                               res.status(200);
                               res.send(userFromMongo);
                           })
                           .catch((error) => {
                               res.send(error);
                           });
                   } else {
                       User.findOne(req.body)
                           .then((userFromMongo) => {
                               res.status(200);
                               res.send(userFromMongo);
                           })
                           .catch((error) => {
                               res.send(error)
                           });
                   }
               })
               .catch((error) => {
                   res.send(error);
               })
       } else {
           res.status(401);
           res.send(data);
       }
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
        });
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
const User = require('../models/user');

const info = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    User.findById(req.body.id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
}

module.exports = {
    info,
}
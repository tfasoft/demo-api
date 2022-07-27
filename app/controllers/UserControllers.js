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

const update = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const data = req.body;

    User.findByIdAndUpdate(data.uid, data.data)
        .then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((error) => {
            res.status(401);
            res.send(error);
        })
}

module.exports = {
    info,
    update,
}
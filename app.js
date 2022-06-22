const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const User = require('./modules/user');

require('dotenv').config();
const env = process.env;

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'thesecretkey',
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        app.listen(env.PORT || 5000);
    })
    .catch((error) => console.log(error));

app.get('/', (req, res) => res.redirect('/auth'));

app.get('/dashboard', (req, res) => {
    if (!req.session.userid) res.redirect('/auth');
    else {
        User.findById(req.session.userid)
            .then((user) => res.render('dashboard', {user}))
            .catch((error) => res.send(error));
    }
});

app.get('/auth', (req, res) => {
    if (req.session.userid) res.redirect('/panel');
    else res.render('auth');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/authorize', (req, res) => {
    if (req.body.way == "register") {
        User.findOne({email: req.body.email})
            .orFail((fail) => {
                const newUser = new User({email: req.body.email, password: req.body.password});

                newUser.save()
                    .then((user) => {
                        req.session.userid = user.id;

                        res.redirect('/dashboard');
                    })
                    .catch((error) => res.send(error));
            })
            .then((then) => res.send('Email is used.'))
            .catch((error) => res.send(error));
    } else if (req.body.way == "login") {
        User.findOne({email: req.body.email, password: req.body.password})
            .orFail((fail) => res.send('User is not founded.'))
            .then((user) => {
                req.session.userid = user.id;

                res.redirect('/dashboard');
            })
            .catch((error) => res.send(error));
    }
});
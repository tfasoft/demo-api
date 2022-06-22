const express = require('express');
const sessions = require('express-session');

const mongoose = require('mongoose');

const axios = require('axios');

const User = require('./modules/user');

require('dotenv').config();
const env = process.env;

const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'testnew',
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
    .catch((error) => res.send('Fuck error'));

app.get('/', (req, res) => res.redirect('/auth'));

app.get('/continue', (req, res) => res.render('continue'));

app.post('/continue', (req, res) => {
    const uid = req.session.userid;

    User.findByIdAndUpdate(uid, {email: req.body.email, pasword: req.body.password})
        .then((user) => res.redirect('/dashboard'))
        .catch((error) => res.send('Fuck error'));
})

app.get('/dashboard', (req, res) => {
    if (!req.session.userid) res.redirect('/auth');
    else {
        User.findById(req.session.userid)
            .then((user) => res.render('dashboard', {user}))
            .catch((error) => res.send('Fuck error'));
    }
});

app.get('/auth', (req, res) => {
    if (req.session.userid) res.redirect('/dashboard');
    else res.render('auth');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/register', (req, res) => {
    const newUser = new User({email: req.body.email, password: req.body.password});

    newUser.save()
        .then((user) => {
            req.session.userid = user.id;
            res.redirect('/dashboard');
        })
        .catch((error) => res.send('Fuck error'));
});

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email, password: req.body.password})
        .orFail((fail) => res.send('User is not founded.'))
        .then((user) => {
            req.session.userid = user.id;
            res.redirect('/dashboard');
        })
        .catch((error) => res.send('Fuck error'));
});

app.post('/update/name', (req, res) => {
    User.findByIdAndUpdate(req.session.userid, {name: req.body.name})
        .then((result) => res.redirect('/dashboard'))
        .catch((error) => res.send('Fuck error'));
});

app.post('/update/email', (req, res) => {
    User.findByIdAndUpdate(req.session.userid, {email: req.body.email})
        .then((result) => res.redirect('/dashboard'))
        .catch((error) => res.send('Fuck error'));
});

app.post('/update/password', (req, res) => {
    User.findOne({id: req.session.userid, password: req.body.current})
        .then((user) => {
            if (req.body.new == req.body.repeat) {
                User.findByIdAndUpdate(req.session.userid, {password: req.body.new})
                    .then((result) => res.send('Password changed'))
                    .catch((error) => res.send('Fuck error'));
            } else {
                res.send('Passwords are not match.');
            }
        })
        .catch((error) => res.send('Fuck error'));
});

app.get('/tfa', (req, res) => {
    const tfa_data = {
        admin: 'ZmErsKQcfaODiKAZdopcwQEjW',
        user: 'BQjschASiigOSOZuFICCMHUYQ',
    };

    axios.get(`https://tele-fa-api.herokuapp.com/api/access/${tfa_data.admin}/${tfa_data.user}`)
        .then((result) => {
            const data = result.data;

            if (data.error == 820) res.send(data.message);
            else if (data.error == 290) res.send(data.message);
            else if (data.error == 800) res.send(data.user)
            else res.send('IDK');
        })
        .catch((error) => res.send(error));
});
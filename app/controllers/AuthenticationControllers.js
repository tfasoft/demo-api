const TelegramAuthentication = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send('Telegram');
}

const EmailPasswordRegister = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send('Email Password Register');
}

const EmailPasswordLogin = () => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send('Email Password Login');
}

module.exports = {
    TelegramAuthentication,
    EmailPasswordRegister,
    EmailPasswordLogin,
}
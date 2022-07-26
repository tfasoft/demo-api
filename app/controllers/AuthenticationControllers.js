const TelegramAuthentication = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.send('Telegram');
}

module.exports = {
    TelegramAuthentication,
}

// import & initialize express
const express = require('express');
const app = express();

// import the wordlists
const enWorlist = require('./data/EN.json');
const nlWordlist = require('./data/NL.json');

// an object which makes the wordlists accessable
const wordlists = {
    en: enWorlist,
    nl: nlWordlist,
};

// finding the words in the wordlist
function getWords(lang, amount) {
    let words = [];

}

// api route
app.get('/api/v1/resources/words', (req, res) => {
    const { lang, amount } = req.query;
    res.send([
        { language: lang },
        { amount: amount }
    ]);
});

// listener (listening for requests beeing made)
app.listen(8080, () => console.log("Listening on http://localhost:8080/"));
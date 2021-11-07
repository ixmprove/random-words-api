// import & initialize express
const express = require('express');
const app = express();
const path = require('path');
const host = "0.0.0.0";
const port = process.env.PORT || 5000;

// import the wordlists
const wordlists = {
    en: require('./data/EN.json'),
    nl: require('./data/NL.json'),
};

// get the words out of the wordlist
function getWords(lang = 'en', amount = 5) {
    amount = amount > 1000 ? 1000 : amount;
    lang = lang.toLowerCase();
    let words = [];
    let indexes = [];

    // does the wordlist exist
    if (wordlists.hasOwnProperty(lang)) {
        const wordlist = wordlists[lang];
        (amount > wordlist.length) ? amount = wordlist.length : amount;
        for (let i = 0; i < amount; i++) {
            let idx = Math.floor(Math.random() * wordlist.length)
            // check for doubles
            if (indexes.includes(idx)) {
                while (indexes.includes(idx)) {
                    idx = Math.floor(Math.random() * wordlist.length);
                }
            }
            indexes.push(idx);

            // add the word to the word list
            const word = wordlist[idx]
            if (!words.includes(word)) {
                words.push(word);
            }
        }
    }
    return words;
}

app.get('/api/v1/resources/words', (req, res) => {
    const { lang, amount } = req.query;
    res.send(getWords(lang, amount));
});

app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}/`)
});
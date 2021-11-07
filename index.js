// import & initialize express
const express = require('express');
const app = express();

const fs = require('fs');

const host = "0.0.0.0";
const port = process.env.PORT || 5000;


// load the wordlists inside ./data/
function loadWordlists() {
    let wordlists = {}
    const files = fs.readdirSync('./data/');

    // loop over each file & import each json file
    for (file in files) {
        file = files[file];
        const language = file.slice(0, 2);
        wordlists[language] = require(`./data/${file}`);
    }
    return wordlists;
}

// define the wordlists
const wordlists = loadWordlists();

function getWords(lang = 'en', amount = 5) {
    amount = amount > 1000 ? 1000 : amount;
    lang = lang.toUpperCase();
    let words = [];

    // does the wordlist for the given language exist
    if (wordlists.hasOwnProperty(lang)) {
        const wordlist = wordlists[lang];
        (amount > wordlist.length) ? amount = wordlist.length : amount;

        // get the words out of the wordlist
        for (let i = 0; i < amount; i++) {
            let idx = Math.floor(Math.random() * wordlist.length);
            let word = wordlist[idx];

            // check for duplicates
            while (words.includes(word)) {
                idx = Math.floor(Math.random() * wordlist.length);
                word = wordlist[idx];
            }
            words.push(word);
        }
    }
    return words;
}

app.get('/api/v1/resources/words', (req, res) => {
    const { lang, amount } = req.query;
    res.send(getWords(lang, amount));
});

app.listen(port, host, console.log(`Listening on http://${host}:${port}/`));
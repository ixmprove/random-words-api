// import & initialize express
const express = require('express');
const app = express();

// import the wordlists
const enWorlist = require('./data/EN.json');
const nlWordlist = require('./data/NL.json');
const testWordlist = require('./data/TEST.json');

// an object which makes the wordlists accessable
const wordlists = {
    en: enWorlist,
    nl: nlWordlist,
    test: testWordlist,
};

// finding the words in the wordlist
function getWords(lang = 'en', amount = 5) {
    amount = amount > 100 ? 100 : amount;
    lang = lang.toLowerCase();
    let words = [];
    let indexes = [];

    // check if the given language exists
    if (wordlists.hasOwnProperty(lang)) {
        // get the wordlist
        const wordlist = wordlists[lang];
        // loop over 'amount' times
        for (let i = 0; i < amount; i++) {
            // create index for the word
            let idx = Math.floor(Math.random() * wordlist.length)
            //check if the index does not exist already
            if (!indexes.includes(idx)) {
                indexes.push(idx)
            } else {
                while (indexes.includes(idx)) {
                    if (!indexes.includes(idx)) {
                        indexes.push(idx);
                        break;
                    } else {
                        idx = Math.floor(Math.random() * wordlist.length);
                    }
                }
            }

            // get the word by using the index
            const word = wordlist[idx].word
            if (!words.includes(word)) {
                words.push(word);
            }
        }
    }
    return {
        language: lang,
        amount: words.length,
        words: words,
    };

}

// api route
app.get('/api/v1/resources/words', (req, res) => {
    const { lang, amount } = req.query;
    res.send(
        { data: getWords(lang, amount) }
    );
});

// listener (listening for requests beeing made)
app.listen(8080, () => console.log("Listening on http://localhost:8080/"));
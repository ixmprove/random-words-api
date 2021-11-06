// import & initialize express
const express = require('express');
const app = express();

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
            const word = wordlist[idx].word
            if (!words.includes(word)) {
                words.push({
                    index: idx,
                    word: word,
                });
            }
        }
    }
    return {
        language: lang,
        amount: words.length,
        words: words,
    };
}

function findWord(lang = 'en', idx = 0) {
    idx = parseInt(idx);
    lang = lang.toLowerCase();

    // does the wordlist exist
    if (wordlists.hasOwnProperty(lang)) {
        const wordlist = wordlists[lang];
        // is the index given inside the wordlist range
        if ((idx + 1) <= wordlist.length) {
            return {
                index: idx,
                word: wordlist[idx].word,
            };
        }
    }
}

app.get('/api/v1/resources/words', (req, res) => {
    const { lang, amount } = req.query;
    res.send(
        { data: getWords(lang, amount) }
    );
});



app.get('/api/v1/resources/word', (req, res) => {
    const { lang, index } = req.query;
    res.send({
        data: findWord(lang, index),
    });
});


app.listen(8080, () => console.log("Listening on http://localhost:8080/"));
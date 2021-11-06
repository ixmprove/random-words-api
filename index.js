// import & initialize express
const express = require('express');
const app = express();
const port = 5000;

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
        language: lang.toUpperCase(),
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
                language: lang.toUpperCase(),
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

app.get('/', (req, res) => {
    res.send(`<h1>Random Word API</h1><h2>Current Languages:</h2><ul>    <li><strong><i>EN</i></strong> - English</li>    <li><strong><i>NL</i></strong> - Dutch</li></ul><br><h2>How to use:</h2><h3>To get the words:</h3><p><i><strong>/api/v1/resources/words</strong>?lang=EN&amount=5</i></p><p>There are 2 queries:</p><ul>    <li><strong><i>lang=</i></strong>EN - to specify the language.</li>    <li><strong><i>amount=</i></strong>5 - the amount of random words. (max. 1000)</li></ul><p><strong>Example response:</strong></p><p><i>{        "data": {        "language": "EN",        "amount": 1,        "words": [        {        "index": 1702,        "word": "accommodate"        }        ]        }        }</i></p><br><br><h3>To find a word by the index</h3><p><i><strong>/api/v1/resources/word</strong>?lang=EN&index=0</i></p><p>There are 2 queries:</p><ul>    <li><strong><i>lang=</i></strong>EN - to specify the language.</li>    <li><strong><i>index=</i></strong>0 - to specify the index.</li></ul><p><strong>Example response:</strong></p><p><i>{        "data": {        "language": "EN",        "index": 0,        "word": "information"        }        }</i></p>`)
});


app.listen(process.env.port || port, () => console.log(`Listening on http://localhost:${port}/`));
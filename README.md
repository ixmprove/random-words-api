# Random Words API

This API returns random words based on the specified language. Associated blog post is [here](https://dev.to/ixmprove/first-restful-api-in-nodejs-word-list-generator-api-1plb)

## Installation
*Node.JS is required to install*
```console
git clone https://github.com/ixmprove/random-words-api.git

cd random-words-api

npm install

npm start
```

## Languages:
- **EN** *- English*

- **NL** *- Dutch*

- **IT** *- Italian*

### Example API call:

`https://wordgenerator-api.herokuapp.com/api/v1/resources/words?lang=EN&amount=5`

*This API is beeing hosted on **Heroku (Free)** - I'm not sure how reliable this is.*


### There are 2 querystrings:

- **lang=EN** *- to specify the language.*

- **amount=5** *- the amount of random words. (max. 1000)*

*These are also the default values passed through if there are no querystrings given.*

### Example Response:
```
[
    "humanitarian",
    "furniture",
    "committees",
    "surprised",
    "procedure"
]
```

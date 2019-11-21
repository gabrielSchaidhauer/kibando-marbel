var express = require('express');
var heroesDb = require('./src/heroes.db.js');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/api/heroes', function (req, res) {
    heroesDb.getHeroes(req.query.name)
        .then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.status(500).send() });
});

app.get('/api/heroes/:id', function (req, res) {
    heroesDb.getHeroById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.status(500).send() });
});

app.post('/api/heroes', function (req, res) {
    heroesDb.saveHero(req.body)
        .then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.status(500).send() });
});

app.put('/api/heroes', function (req, res) {
    heroesDb.updateHero(req.body)
        .then(result => res.status(200).send())
        .catch(err => { console.log(err); res.status(500).send() });
});

app.delete('/api/heroes/:id', function (req, res) {
    heroesDb.deleteHero(req.params.id)
        .then(result => res.status(200).send())
        .catch(err => { console.log(err); res.status(500).send() });
});

app.listen(3000);